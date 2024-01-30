function ShowUserData(props) {
    if (props == null) {
        return (
            <>
                <h1>{props.name}</h1>
            </>
        );
    } else {
        return (
            <>
                <h1>No user selected</h1>
            </>
        );
    }
}

export default ShowUserData;