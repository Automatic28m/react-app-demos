function ProductGrid({ dataObj, index }) {
    return (
        <div key={index} className="col-sm-4 p-2">
            <div className="card d-flex flex-column justify-content-between align-items-center p-3 h-100">
                <div className="img h-100 d-flex align-items-center mb-3">
                    <img src={dataObj.image} width="200" />
                </div>
                <div className='content'>
                    <h1>{dataObj.title}</h1>
                    <h3>{dataObj.category}</h3>
                    <p>{dataObj.description}</p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <h2 className='text-primary'>${dataObj.price}</h2>
                    <button className='btn btn-primary'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductGrid;