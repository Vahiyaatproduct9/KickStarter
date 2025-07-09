import { supabase } from '../lib/supabaseClient'
import 'dotenv/config'
export default async function ([category, file, caption]: [string, File, string]) {
    const { data: authdata, error: autherror } = await supabase.auth.getUser()
    if (autherror || !authdata || !authdata.user) {
        return { error: 'Authentication Error: ' + (autherror?.message || 'User not authenticated') }
    }

    const timestamp = Date.now()
    const filePath = `${timestamp}_${file.name}`

    const { data, error } = await supabase.storage
        .from(category)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        })
    if (error) {
        return { error: 'Upload Error: ' + error.message }
    }
    const user_id = authdata.user.user_metadata.user_id
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/` + category + '//' + filePath

    const { error: insertError } = await supabase.from('user_uploads').insert([
        {
            filePath: imageUrl,
            user_id: user_id,
            caption: caption,
            category: category,
            likes: 0,
            comments: [],
        }
    ])

    if (insertError) {
        return { error: 'Insert Error: ' + insertError.message }
    }

    return {
        data,
        error: null,
    }
}