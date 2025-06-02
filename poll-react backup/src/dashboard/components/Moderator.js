import ModDataTable from './ModDataTable';
import RolesInfoCollaps from './RolesInfoCollaps';
function Moderator() {
    return (
        <div className="">
            <div className="mb-5">
                <b className="text-xl">Moderator Data</b>
            </div>
            <div className="mb-5">
                <RolesInfoCollaps />

            </div>
            <div className="mb-5">
                <ModDataTable />
            </div>
        </div>
    )
}

export default Moderator