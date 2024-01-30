import UserData from "./component/UserData";
import axios from "axios";

function User() {
    const url = "http://localhost:8080/api/auth/signout";
    const handleSignout = (e) => {
        e.preventDefault();

        axios.post(url, { withCredentials: true })
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log('An error occurred:', e);
            })
    }

    return (
        <>
            <UserData />
            <button type="button" onClick={handleSignout}>Signout</button>
        </>
    )
}

export default User;