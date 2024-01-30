function SearchBar(props) {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-white">Search poll</span>
            </label>
            <input type="text" placeholder="Search..." className="input input-bordered w-full" 
                name="search"
                onChange={props.onChange}
            />
        </div>
    )
}

export default SearchBar;