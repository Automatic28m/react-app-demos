import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure you've installed Axios
import Navbar from "./Navbar";
function AddUser() {
    // Step 1: Create state variables to store form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deptId, setDeptId] = useState('');

    // Axios select dept data
    const url = `http://localhost:8080/depts`;
    const [data, setData] = useState(null); // Change the initial state to null

    const fetchInfo = () => {
        return axios.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setData(null); // Set data to null in case of an error
            });
    };

    useEffect(() => {
        fetchInfo();
    }, [url]);



    // Step 2: Set up an event handler to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Step 3: Make an Axios POST request to send form data
        // try {
        //     const response = await axios.post('http://localhost:8080/register', {
        //         name,
        //         email,
        //         password,
        //         deptId
        //     });
        //     // Handle the response here, e.g., show a success message or redirect
        //     console.log('Data sent successfully', response.data);
        //     window.location.href = '/';
        // } catch (error) {
        //     // Handle errors here, e.g., show an error message
        //     console.error('Error sending data', error);
        // }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                name,
                email,
                password,
                deptId
            });
            if (response.status === 200) {
                // Registration was successful
                alert(response.data.message);
                console.log('Status Code:', response.data.status);
                console.log('Status Message:', response.data.message);
                window.location.href = '/';
                // You can access other data in response.data as needed.
            } else {
                // Registration failed
                alert(response.data.message);
                console.log('Status Code:', response.status);
                console.log('Status Message:', response.message);
                // Handle error messages and other data as needed.
            }
        } catch (e) {
            console.log('An error occurred:', e);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="container mt-5">
                    <h1>Add User</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="" className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="" className="form-label">Department</label>
                            <select name="dept_id" className="form-select" id="" onChange={(e) => setDeptId(e.target.value)}>
                                <option value="">Select department...</option>
                                {data ? ( // Check if data is not null
                                    data.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))
                                ) : (
                                    <option>No department available</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="submit"
                                className="btn btn-primary" name="submit" id="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddUser;