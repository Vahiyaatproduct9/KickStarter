import { supabase } from '../lib/supabaseClient'

const { data: authData, error: authError } = await supabase.auth.getUser()
export async function like_unlike_post(post_id: string, GET_liked: boolean) {
    if (!authData.user || authError) { return 'authError : ' + authError }
    const { data: checkLikeData, error: checkLikeError } = await supabase.from('likes').select('user_id').eq('post_id', post_id)
    const check = checkLikeData?.find(like => like.user_id === authData.user?.user_metadata?.user_id)
    if (GET_liked) {
        if (!check) {
            const { data, error } = await supabase.from('likes').insert({
                post_id: post_id,
                user_id: authData.user?.user_metadata?.user_id

            })
            return data
        }
    } else {
        if (check) {
            const { data, error } = await supabase.from('likes').delete().eq('post_id', post_id).eq('user_id', authData.user?.user_metadata.user_id)
            return data
        }
    }
}

export async function getLikeCount(post_id: string) {
    const { data, error } = await supabase.from('likes').select('*').eq('post_id', post_id)
    return data?.length
}
export async function checkWhetherAlreadyLiked(post_id: string) {
    const { data } = await supabase.from('likes').select('user_id').eq('post_id', post_id)
    const check = data?.find(like => like.user_id === authData.user?.user_metadata?.user_id)
    if (check) return true; else return false
} 