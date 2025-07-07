import signUp from '../api/signUp'
import { Login } from '../api/login'
export async function SignUpLogic(email: string, username: string, pass: string, pass2: string) {
    if (pass !== pass2) {
        return { message: 'passwords do not match', success: false }
    }
    const { data, error } = await signUp(email, username, pass)
    return { data, error }
}

export async function LoginLogic(email: string, password: string) {
    const { data, error } = await Login(email, password)
    return { data, error }
}