import { useDispatch } from "react-redux";

function ProductGrid({ dataObj, index }) {
    const dispatch = useDispatch();

    const addToCart = (product) => {
        return {
            type: 'ADD_TO_CART',
            product
        };
    };

    const handleAddToCart = () => {
        dispatch(addToCart(dataObj));
    }
    return (
        <div className="card w-full shadow-md hover:shadow-xl" key={index}>
            <figure className="bg-white p-2"><img src={dataObj.image} className="" alt="Product" /></figure>
            <div className="card-body">
                <h1 className="card-title text-primary">{dataObj.title}</h1>
                <h3 className="text-accent">{dataObj.category}</h3>
                <p>{dataObj.description}</p>
                <div className="card-actions justify-end">
                    <h1 className='text-secondary'>${dataObj.price}</h1>
                    <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
        // <div key={index} className="p-2">
        //     <div className="card d-flex flex-column justify-content-between align-items-center p-3 h-100">
        //         <div className="img h-100 d-flex align-items-center mb-3">
        //             <img src={dataObj.image} width="200" />
        //         </div>
        //         <div className='content'>
        //             <h1>{dataObj.title}</h1>
        //             <h3>{dataObj.category}</h3>
        //             <p>{dataObj.description}</p>
        //         </div>
        //         <div className="d-flex flex-row justify-content-between align-items-center w-100">
        //             <h2 className='text-primary'>${dataObj.price}</h2>
        //             <button className='btn btn-primary'>Add to cart</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ProductGrid;