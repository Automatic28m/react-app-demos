import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserTable() {
    const [users, setUsers] = useState([]); // Initialize users with your user data

    //Axios
    const url = "http://localhost:8080/user";
    const [data, setData] = useState([])
    let counter = 0;

    const fetchInfo = () => {
        return axios.get(url)
            .then((response) => setData(response.data));
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const deleteUser = async (user_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete_user/${user_id}`);
                
                // Update the local state to remove the deleted user
                setUsers(users.filter(user => user.id !== user_id));

                alert('User deleted successfully');
                // window.location.href = '/';
            } catch (e) {
                alert('Error deleting user', e);
            }
        }
    };

    return (
        <>
            <div className="table-responsive">
                <h1>User Table</h1>
                <Link className="btn btn-outline-primary mb-2" to="/AddUser">Add User</Link>
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr className="bg-dark">
                            <th scope="col">No</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Department</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dataObj, index) => {
                            counter++;
                            return (
                                <tr key={dataObj.id}>
                                    <td>{counter}</td>
                                    <td>{dataObj.id}</td>
                                    <td>{dataObj.name}</td>
                                    <td>{dataObj.email}</td>
                                    <td>{dataObj.password}</td>
                                    <td>{dataObj.deptName}</td>
                                    <td className="d-flex gap-1">
                                        <Link name="" id="" className="btn btn-primary" href="#" role="button" to={`/user/${dataObj.id}`}>View</Link>
                                        <Link name="" id="" className="btn btn-danger" href="#" role="button" onClick={() => deleteUser(dataObj.id)}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default UserTable;