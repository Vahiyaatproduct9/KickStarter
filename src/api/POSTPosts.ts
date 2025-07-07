import { supabase } from '../lib/supabaseAdmin'

export default async function uploadFile(category: string, file: File) {
    const timestamp = Date.now()
    const filePath = `${category}/${timestamp}_${file.name}`

    const { data, error } = await supabase.storage
        .from(category)
        .upload(filePath, file)
    if (error) {
        return { error: 'Upload Error: ' + error.message }
    }

    const imageUrl = `https://tcwcpjkachqmdbmehrel.supabase.co/storage/v1/object/public/${category}/${timestamp}_${file.name}`

    const { error: insertError } = await supabase.from('user_uploads').insert([
        {
            filePath: filePath,
            usernameOfImage: 'user1',
            category: category,
            likes: 0,
            comments: [],
        },
    ])

    if (insertError) {
        return { error: 'Insert Error: ' + insertError.message }
    }

    return {
        data: {
            imageUrl,
            filePath,
        },
        error: null,
    }
}