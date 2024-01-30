import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';

function User() {
    const { user_id } = useParams();

    // Axios
    const url = `http://localhost:8080/userById/${user_id}`;
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

    const deleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete_user/${user_id}`);
                alert('User deleted successfully');
                window.location.href = '/';
            } catch (e) {
                alert('Error deleting user', e);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='my-5'>
                    {data ? ( // Check if data is not null
                        <>
                            <h1 className='text-primary'>{data.name}</h1>
                            <p className='fw-light'>{data.id}</p>
                            <h4>Email : {data.email}</h4>
                            <h4>Password : {data.password}</h4>
                            <h4>Department : {data.deptName}</h4>
                        </>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div className='d-flex gap-2'>
                    <Link to="/" className="btn btn-primary mt-2">Back</Link>
                    <Link to={`/EditUser/${user_id}`} className="btn btn-outline-warning mt-2">Edit</Link>
                    <a className="btn btn-outline-danger mt-2" onClick={deleteUser}>Delete</a>
                </div>
            </div>
        </>
    );
}

export default User;
