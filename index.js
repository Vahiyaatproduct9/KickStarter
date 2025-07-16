import { createClient } from '@supabase/supabase-js'
const NEXT_PUBLIC_SUPABASE_URL = 'https://tcwcpjkachqmdbmehrel.supabase.co'
const NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjd2NwamthY2hxbWRibWVocmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODAzNjksImV4cCI6MjA2NzM1NjM2OX0.z5mr22xj19Nj8Um5j42S5Ie17M5xKOoCvEkTMnsjnqY'
const supabaseAdminKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjd2NwamthY2hxbWRibWVocmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTc4MDM2OSwiZXhwIjoyMDY3MzU2MzY5fQ.653cDoyC_CtP0UXk0S5GQo8A-nmD9_wdPI-gU4MKp3U'
const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseKey) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
const supabase = createClient(supabaseUrl, supabaseKey)
export async function seeComment(post_id) {
    const { data, error } = await supabase.from('comments').select().eq('post_id', post_id)
    const commentIds = data ? [...new Set(data.map(item => item.user_id))] : [];
    const { data: pfpData, error: pfpError } = await supabase
        .from('users')
        .select('user_id, pfpPath')
        .in('user_id', commentIds)

    const pfpLookup = Object.fromEntries((pfpData ?? []).map(user => [user.user_id, user.pfpPath]))
    const newData = data?.map((item) => {
        return {
            ...item,
            pfpPath: pfpLookup[item.user_id] || null
        }
    })
    if (error || !data) return error
    return newData
}
console.log(await seeComment('1'))