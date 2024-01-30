function RolesInfoCollaps() {
    return (
        <>
            <details className="collapse bg-base-200 collapse-arrow">
                <summary className="collapse-title text-md font-medium">
                    <span className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        About roles and permission
                    </span>
                </summary>
                <div className="collapse-content">
                    <ul className="list-disc px-5">
                        <li><b>User</b> is able to access general content</li>
                        <li><b>Moderator</b> is able to access general content, review and manage content</li>
                        <li><b>Admin</b> is able to access general content, review content, manage content, and manage user</li>
                    </ul>
                </div>
            </details>
        </>
    )
}
export default RolesInfoCollaps