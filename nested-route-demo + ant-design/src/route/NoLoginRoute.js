import { Outlet } from "react-router-dom";
import SideMenu from "../components/layout/SideMenu/SideMenu";

function NoLoginPage() {

    // Check login, if there's no logged in, navigates to LOGIN PAGE
    // Else, stay.
    return (
        <>
            <Outlet />
        </>
    )
}

export default NoLoginPage;