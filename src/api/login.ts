import { supabase } from '../lib/supabaseClient'
export async function Login(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
    })
    return { data, error }
}