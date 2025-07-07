'use client'
import React, { useState } from 'react'
import { SignUpLogic, LoginLogic } from '@/middleware/checkAuth'
import css from './login.style.module.css'
import { useRouter } from 'next/navigation'

function Auth() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if (typeof email === 'string' && typeof password === 'string') {
            const { error } = await LoginLogic(email, password);
            if (error) {
                alert(`Login failed: ${error.message || error}`);
            } else {
                alert('Login successful!');
                router.push('/')
            }
        } else {
            alert('Please enter both email and password.');
        }
    }
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const email = data.get('email'.trim())
        const username = data.get('username'.trim())
        const password = data.get('password'.trim())
        const repassword = data.get('repassword'.trim())
        if (typeof email === 'string' && typeof username === 'string' && typeof password === 'string' && typeof repassword === 'string') {
            const { error } = await SignUpLogic(email, username, password, repassword)
            if (!error) {
                window.alert('sign Up successful')
                router.push('/')
            } else {
                alert(`Sign Up failed: ${error.message || error}`)
            }
        }
    }
    return (
        <div className={css.mainbody}>
            <div className={css.container}>
                <div className={css.header}>
                    <div><span>{isLogin ? 'Login' : 'Sign Up'}</span></div>
                    <div>
                        <button onClick={() => { setIsLogin(!isLogin) }}>{isLogin ? 'Sign Up ' : 'Login '}</button>
                        <span>{' '}instead?</span>
                    </div>
                </div>
                <div className={css.body}>
                    {isLogin ? (
                        <form id='Login' onSubmit={handleLogin}>
                            <div className={css.username}>
                                <label>Email :</label>
                                <input type='email' name='email' placeholder='ramesh_siddhi' required />
                            </div>
                            <div className={css.password}>
                                <label>Password :</label>
                                <input type='password' name='password' placeholder='Password' required />
                            </div>
                            <div className={css.submit}>
                                <button>Login</button>
                            </div>
                        </form>
                    ) : (
                        <form id='signUp' onSubmit={handleSignUp}>
                            <div className={css.email}>
                                <label>Email :</label>
                                <input type='email' name='email' placeholder='example@example.com' required />
                            </div>
                            <div className={css.username}>
                                <label>Choose Username :</label>
                                <input type='text' name='username' placeholder='ramesh_siddhi' required />
                            </div>
                            <div className={css.password}>
                                <label>Create Password :</label>
                                <input type='password' name='password' placeholder='Password' required />
                            </div>
                            <div className={css.password}>
                                <label>Re-Enter Password :</label>
                                <input type='password' name='repassword' placeholder='Password' required />
                            </div>
                            <div className={css.submit}>
                                <button>Sign Up</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Auth
