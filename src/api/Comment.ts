import { supabase } from '../lib/supabaseClient'
const { data: checkAuthdata, error: checkAuthError } = await supabase.auth.getUser()
export async function seeComment(post_id: string) {
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

export async function postComment(post_id: string, comment: string) {
    if (checkAuthError || !checkAuthdata.user) return checkAuthError
    const { data: POSTCommentData, error: POSTCommentError } = await supabase.from('comments').insert({
        post_id: post_id,
        user_id: checkAuthdata.user.user_metadata.user_id,
        comment: comment
    })
    if (POSTCommentError || !POSTCommentData) return POSTCommentError
    return POSTCommentData
}