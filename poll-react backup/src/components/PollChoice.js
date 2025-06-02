function PollChoice(ObjChoice) {
    console.log(ObjChoice);
    return (
        <div div className="form-control hover:bg-base-100 px-3 rounded-lg" >
            <label className="label cursor-pointer">
                <span className="label-text">{ObjChoice.title}</span>
                <input type="radio" name="radio-10" value={ObjChoice.id} className="radio"/>
            </label>
        </div >
    )
}
export default PollChoice;