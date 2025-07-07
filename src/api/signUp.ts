import { supabase } from "../lib/supabaseClient";
export default async function (email: string, username: string, pass: string) {
    const { data, error } = await supabase.auth.signUp(
        {
            email: email,
            password: pass,
            options: {
                data: {
                    user_id: username
                }
            }
        }
    )
    const { statusText } = await supabase.from('users').insert({
        user_id: username,
        pfpPath: ''
    })
    if (!error) {
        if (statusText !== "Created") {
            return { data, error }
        }
        else {
            return statusText
        }
    }
    return error
}