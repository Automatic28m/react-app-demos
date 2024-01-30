import LeftSidebar from "./components/LeftSidebar";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import toastr from "toastr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index(props) {
    const Navigate = useNavigate();
    const { component: ComponentType } = props;

    const permissionCheck = () => {
        axios.get(`http://localhost:8080/api/auth/adminAndModPermission`, { withCredentials: true })
            .then((res) => {

            }).catch((e) => {
                toastr.error("You have no right to access this page");
                console.log("permission check: ", e);
                Navigate("/");
            })
    }

    useEffect(() => {
        permissionCheck();
    }, [])

    return (
        <div className="">
            <LeftSidebar component={ComponentType} />
        </div>
    )
}

export default Index