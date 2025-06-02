import { useDispatch } from 'react-redux';
import AuthenApi from '../api/AuthenApi';
import { setUserData } from '../redux/slice/UserSlice';

const login = async (loginData) => {
    return await AuthenApi.signin(loginData);
}

const AuthService = {
    login
}
export default AuthService;