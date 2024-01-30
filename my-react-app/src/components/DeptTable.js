import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeptTable() {
    //Axios
    const url = "http://localhost:8080/depts";
    const [data, setData] = useState([])

    const fetchInfo = () => {
        return axios.get(url)
            .then((response) => setData(response.data));
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (

        <>
            <div className="table-responsive">
                <h1>Department Table</h1>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="bg-dark">
                            <th scope="col">Id</th>
                            <th scope="col">Department name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dataObj, index) => {
                            return (
                                <tr>
                                    <td>{dataObj.id}</td>
                                    <td>{dataObj.name}</td>
                                    <td><a name="" id="" className="btn btn-primary" href="#" role="button">View</a></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </>

    );
}

export default DeptTable;