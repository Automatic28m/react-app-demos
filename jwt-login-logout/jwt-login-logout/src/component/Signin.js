import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const url = "http://localhost:8080/api/auth/signin";

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(url, {
            username: username,
            password: password
        },{
            withCredentials: true,
            
        })
        .then(response => {
            console.log(response.data);

            // Assuming your server responds with a 'userData' object containing the JWT token
            // const userData = response.data;

            // Set the JWT token as a cookie
            // setCookie('JWT', userData.accessToken, 1); // 'JWT' is the cookie name, and '1' is the number of days it should be valid
        })
        .catch(e => {
            console.log('An error occurred:', e);
        })
    }

    // const setCookie = (name, value, days) => {
    //     const expires = new Date();
    //     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    //     const cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    //     document.cookie = cookie;
    // };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label><br />
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </>
    )
}
export default Signin;