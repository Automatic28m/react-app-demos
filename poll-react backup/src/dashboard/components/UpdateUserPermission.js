import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import toastr from "toastr";
import RolesInfoCollaps from './RolesInfoCollaps'

function UpdateUserPermission() {

    const { user_id } = useParams();
    const [userData, setUserData] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState(['user']); // Initial roles
    const availableRoles = ['User', 'Moderator', 'Admin'];

    const mapBackendRoleToFrontend = (backendRole) => {
        switch (backendRole) {
            case 'ROLE_USER':
                return 'User';
            case 'ROLE_ADMIN':
                return 'Admin';
            case 'ROLE_MODERATOR':
                return 'Moderator';
            default:
                return backendRole;
        }
    };

    const handleCheckboxChange = (role) => {
        // Check if the role is already selected
        if (selectedRoles.includes(role)) {
            // If selected, remove it
            setSelectedRoles(selectedRoles.filter(selectedRole => selectedRole !== role));
        } else {
            // If not selected, add it
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserById/${user_id}`, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
                const selectedRoleNames = res.data.roles.map(role => mapBackendRoleToFrontend(role.name));
                setSelectedRoles(selectedRoleNames || []);
                console.log(res.data);
            }).catch((e) => {
                toastr.error("An error occurs : ", e);
            })
    }

    useEffect(() => {
        fetchUserData();
    }, [user_id]);

    const handleSave = () => {
        console.log('Selected Roles:', selectedRoles);
        axios.put(`http://localhost:8080/api/auth/updateUserRoles/${user_id}`,
            {
                roles: selectedRoles
            },
            { withCredentials: true })
            .then(response => {
                // Handle success response
                toastr.success(response.data.message);
                // history.push(`/admin/users/updatePermission/${user_id}`);
                // window.location.href=`/admin/users/updatePermission/${user_id}`;
            })
            .catch(error => {
                // Handle error
                toastr.error('Error updating user roles:', error);
            });

    }

    return (
        <>
            <div>
                <b className="text-xl">Update User Permission</b>
            </div>
            <div className="mt-5">
                <b className="text-accent text-5xl">{userData.username}</b>
            </div>
            <div>
                <p className="">#{userData.id}</p>
            </div>
            <div className="w-1/2 p-3 bg-slate-300 mt-3 rounded-lg">
                {/* Display checkboxes for each role */}
                {availableRoles.map((role) => (
                    <div key={role} className="form-control">
                        <label className="label cursor-pointer">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                                <label htmlFor={role}>{role}</label>
                            </div>
                            <input
                                type="checkbox"
                                className="checkbox"
                                id={role}
                                checked={selectedRoles.includes(role)}
                                onChange={() => handleCheckboxChange(role)}
                            />
                        </label>
                    </div>
                ))}
            </div >
            <div className="mt-3">
                <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_5').showModal()}>Save Change</button>
            </div>
            <div className="mt-3">
                <RolesInfoCollaps />
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to save changes?</h3>
                    <p>You are assigning roles</p>
                    <ul className="list-disc px-5">
                        {selectedRoles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                    <p>to <b className="text-accent">{userData.username}</b></p>
                    <div className="modal-action">
                        <form className="flex gap-2" method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-accent" onClick={(e) => handleSave()}>
                                Save
                            </button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default UpdateUserPermission