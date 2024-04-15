import { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { login, signup } from "../store/actions/user.actions"
import { LoginForm } from "./LoginForm"
import { useSelector } from "react-redux";

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    console.log("🚀 ~ file: LoginSignup.jsx:11 ~ LoginSignup ~ user:", user)


    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    async function _signup(credentials) {

        try {
            await signup(credentials)
            showSuccessMsg('Signed in successfully')
        } catch (err) {

            showErrorMsg('Oops try again')
        }
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
            {user ? (
            < section className="login-user">
                <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                <button className="logout-btn btn" onClick={onLogout}>Logout</button>
            </ section >
        ) : (
            <section className="login-layout">
            </section>
        )}
        </div >
        
      
        
    )
}


