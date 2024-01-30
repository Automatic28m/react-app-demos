import axios from "axios";

function Signout() {
    const url = "http://localhost:8080/api/auth/logout";

    const handleSignout = (e) => {
        e.preventDefault();

        axios.get(url, {withCredentials: true})
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log('An error occurred:', e);
        })
    }
}
export default Signout;
