import { useEffect, useState } from "react"
import AuthenApi from '../api/AuthenApi';
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async () => {
        // const response = await AuthenApi.signin(loginData);
        const response = await AuthService.login(loginData);
        dispatch(setUserData(response.data))
        navigate('/');
    }

    return (
        <>
            <div>
                <label>username</label>
                <input type="text" name="username" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                <label>password</label>
                <input type="text" name="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <input type="submit" value="Login" onClick={handleLogin} />
            </div>
        </>
    )
}

export default Login;