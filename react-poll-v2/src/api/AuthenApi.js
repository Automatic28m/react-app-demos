import axios from "axios"

const signin = (data) => {
    return axios.post(`http://localhost:8080/api/auth/signin`, data, { withCredentials: true });
}

const AuthenApi = {
    signin
};
export default AuthenApi;