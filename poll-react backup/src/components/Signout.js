import axios from "axios";
import toastr from "toastr";

const SignOut = () => {
    const url = `http://localhost:8080/api/auth/signout`;
    axios.get(url,{withCredentials:true})
        .then((res => {
            // toastr.success(res.data);
            window.location.href = '/Signin'
        })).catch((e => {
            toastr.error("An error occurs : " + e)
        }))
}
export default SignOut;