import { supabase } from "../lib/supabaseClient";
export default async function (email: string, pass: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pass
    })
    return { data, error }
}