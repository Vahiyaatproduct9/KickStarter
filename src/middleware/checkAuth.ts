import signUp from '../api/signUp'
import { Login } from '../api/login'
import { supabase } from '../lib/supabaseClient'
export async function SignUpLogic(email: string, username: string, pass: string, pass2: string) {
    if (pass !== pass2) {
        return { message: 'passwords do not match', success: false }
    }
    const result = await signUp(email, username, pass)
    if (typeof result === 'string' || result instanceof Error) {
        return { data: null, error: result, success: false }
    }
    const { data, error } = result
    if (!error) {
        return { data, error, success: true }
    }
    return { data, error, success: false }
}

export async function LoginLogic(email: string, password: string) {
    const { data, error } = await Login(email, password)
    return { data, error }
}
export async function checkWhetherSignedIn() {
    const { data, error } = await supabase.auth.getUser()
    if (!data || error) {
        return false
    }
    return true
}