import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {

    const userData = useSelector((state) => state.UserData.userData);


    useEffect(() => {
        console.log(userData);
    }, [userData]);


    return (
        <>
        {userData.username}
        {userData.email}
        </>
    )
}

export default Home;