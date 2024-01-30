import AdminDataTable from "./AdminDataTable";
import RolesInfoCollaps from './RolesInfoCollaps';
function Admin() {
    return (
        <div className="">
            <div className="mb-5">
                <b className="text-xl">Admin Data</b>
            </div>
            <div className="mb-5">
                <RolesInfoCollaps/>

            </div>
            <div className="mb-5">
                <AdminDataTable/>
            </div>
        </div>
    )
}

export default Admin