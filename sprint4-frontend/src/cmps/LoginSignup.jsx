import { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { login, signup } from "../store/actions/user.actions"
import { LoginForm } from "./LoginForm"
import { useSelector } from "react-redux";
import { ImgUploader } from "./ImgUploader";

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

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

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
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
            <ImgUploader onUploaded={onUploaded} />
        </div >



    )
}


