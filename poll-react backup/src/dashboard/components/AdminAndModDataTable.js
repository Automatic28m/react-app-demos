import axios from "axios";
import { useEffect, useState } from "react"
import toastr from "toastr";
import { Link } from 'react-router-dom'
function AdminAndModDataTable() {

    const [userList, setUserList] = useState([]);

    const fetchUsers = () => {
        axios.get("http://localhost:8080/api/auth/getUsers", { withCredentials: true })
            .then((response) => {
                setUserList(response.data);
                console.log(response.data);
            }).catch((e) => {
                toastr.error("An error occurs: ", e);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (user_id) => {
        axios.delete(`http://localhost:8080/api/admin/deleteUserById/${user_id}`, { withCredentials: true })
            .then((res) => {
                toastr.success(`Delete User (User ID : ${user_id}) successfully`);
                setUserList((prevUsers) => prevUsers.filter((user) => user.id !== user_id));
            }).catch((e) => {
                toastr.error("An error occurs : ", e);
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user, index) => {

                            const hasAdminOrModeratorRole = user.roles.some(role => role.name === "ROLE_ADMIN" || role.name === "ROLE_MODERATOR");



                            // If any choice has "ROLE_USER", skip rendering this row
                            if (!hasAdminOrModeratorRole) {
                                return null;
                            }

                            return (
                                <tr key={index} className="hover:bg-slate-300">
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                    <span>{user.username.substring(0, 2)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-accent">{user.username}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    {/* User Roles */}
                                    <td>
                                        <ul className="list-disc">
                                            {user.roles.map((role, index) => {
                                                let roleName = role;
                                                if (typeof role === 'object' && role.name) {
                                                    roleName = role.name;
                                                }

                                                switch (roleName) {
                                                    case 'ROLE_USER':
                                                        return <li key={index}>User</li>;
                                                    case 'ROLE_ADMIN':
                                                        return <li key={index}>Admin</li>;
                                                    case 'ROLE_MODERATOR':
                                                        return <li key={index}>Moderator</li>;
                                                    default:
                                                        return <li key={index}>{roleName}</li>;
                                                }
                                            })}
                                        </ul>
                                    </td>
                                    <th className="flex gap-3">
                                        <Link className="text-slate-400" to={`/admin/users/userInsight/${user.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </Link>
                                        <Link className="text-slate-400" to={`/admin/users/updatePermission/${user.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </Link>
                                        <button className="text-slate-400" onClick={() => document.getElementById(`my_modal_${user.id}`).showModal()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </th>

                                    <dialog id={`my_modal_${user.id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Deleteing user?</h3>
                                            <p className="py-4">Are you sure to delete this user?<br /> All poll of this user will be deleted either.</p>
                                            <div className="flex gap-1">
                                                <b>Username : </b><p className="text-accent">{user.username}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <b>User ID : </b><p className="text-accent">{user.id}</p>
                                            </div>
                                            <div className="modal-action">
                                                <form className="flex gap-2" method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-accent" onClick={(e) => handleDeleteUser(user.id)}>Delete</button>
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>

                                </tr>
                            )
                        })
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>
                            Manage
                        </th>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
export default AdminAndModDataTable