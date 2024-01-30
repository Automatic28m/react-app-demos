import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserData() {

    const [data, setData] = useState("");

    // Function to make authenticated API request
    function fetchData() {

        axios.get('http://localhost:8080/api/test/user', { withCredentials: true })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log("an error occurs : " + error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {data}
        </div>
    );
}

export default UserData;
