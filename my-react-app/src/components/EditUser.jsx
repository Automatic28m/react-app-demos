import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function EditUser() {
    const { user_id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deptId, setDeptId] = useState('');

    // Axios
    const url = `http://localhost:8080/userById/${user_id}`;
    console.log(url);
    const [data, setData] = useState(null);

    const fetchInfo = () => {
        return axios.get(url)
            .then((response) => {
                setData(response.data);

                // Set the state variables with the fetched data
                setName(response.data.name);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setDeptId(response.data.deptId);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setData(null);
            })
    };

    useEffect(() => {
        fetchInfo();
    }, [url]);

    // Axios select dept data
    const deptsUrl = `http://localhost:8080/depts`;
    const [depts, setDepts] = useState(null); // Change the initial state to null

    const fetchDepts = () => {
        return axios.get(deptsUrl)
            .then((response) => {
                setDepts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setDepts(null); // Set data to null in case of an error
            });
    };

    useEffect(() => {
        fetchDepts();
    }, [deptsUrl]);

    const saveEdit = async (e) => {
        e.preventDefault();

        const confirm = window.confirm("Are you sure you want to save this user?");
        if (confirm) {
            try {
                const id = user_id;
                const response = await axios.put('http://localhost:8080/update', {
                    id, //matching to server. not user_id
                    email,
                    name,
                    password,
                    deptId
                });
                console.log('Data sent successfully', response.data);
                window.location.href = '/';
            } catch (error) {
                // Handle errors here, e.g., show an error message
                console.error('Error sending data', error);
            }
        }

    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Edit User</h1>
                <form onSubmit={saveEdit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input
                            type="text"
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
                            {depts ? ( // Check if data is not null
                                depts.map((dept) => (
                                    <option key={dept.id} value={dept.id} selected={dept.id === deptId}>{dept.name}</option>
                                ))
                            ) : (
                                <option>No department available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="submit" className="btn btn-primary" name="submit" id="submit" value="Save" />
                    </div>
                </form>
            </div>
        </>
    );
}
export default EditUser;
