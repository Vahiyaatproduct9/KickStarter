import { supabase } from '../lib/supabaseAdmin'
export default async function (file: File) {
    const { data, error } = await supabase.storage
        .from('user_pfp')
        .upload(
            'public/tech/image1.png',
            file,
            { upsert: false, cacheControl: '3600' })
    if (!error && data) {
        return data.fullPath
    }
}