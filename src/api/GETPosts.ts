import { supabase } from '../lib/supabaseClient'
interface Comment {
    user_id: string;
    [key: string]: any;
}

export default async function (category: string) {
    const { data, error } = await supabase
        .from('user_uploads')
        .select('*')
        .eq('category', category)
    // 1. Get all unique user_ids from comments
    let commentorIds = data
        ? [...new Set(data.flatMap(item => [item.user_id, ...item.comments.map((c: Comment) => c.user_id)]))]
        : [];
    // 2. Get their profile pics in one batch request
    const { data: pfpdata, error: pfperror } = await supabase
        .from('users')
        .select('user_id, pfpPath')
        .in('user_id', commentorIds);

    if (pfperror) console.error(pfperror);


    const pfpLookup = Object.fromEntries(
        (pfpdata ?? []).map(user => [user.user_id, user.pfpPath])
    );

    // 4. Merge pfps into each comment inside the nested structure
    const newData = data?.map(item => ({
        ...item,
        uploaderPfpPath: pfpLookup[item.user_id] || null,
        comments: item.comments.map((comment: Comment) => ({
            ...comment,
            pfpPath: pfpLookup[comment.user_id] || null
        }))
    }));

    return { newData, error };
}