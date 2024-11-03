import React from "react"
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import google from '../res/google.svg'

const Google_authentication = ({onSuccess}) => {

    const userData = {
        name: "",
        email: "",
        password: "",
    }
    
    const getGoogleLogin = async (tokenResponse) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            
            userData.name = userData.given_name;
            userData.email = userData.email;
            userData.password = userData.sub;

            console.log(userData);
            onSuccess(userData);

            localStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

   const login = useGoogleLogin({
    onSuccess: getGoogleLogin,
    onError: (error) => console.log('Login Failed:', error)
    });

    return(
        <div >
           <button className=" bg-white border-solid border-[2px] p-2  font-medium rounded-[0.5rem] border-[#dddddd] w-full justify-center flex gap-2 transition duration-75 active:scale-[0.95] active:duration-75" onClick={() => login()}>Continue with <img  src={google} alt="My Icon" width="25" height="20" /> </button>
        </div>
    )
}

export default Google_authentication