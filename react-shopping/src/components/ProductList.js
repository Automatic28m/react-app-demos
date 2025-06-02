import { useDispatch } from "react-redux";
function ProductList({ dataObj, index }) {

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
        <div className="card sm:card-side shadow-md hover:shadow-xl mb-5 flex bg-white">
            <figure className="sm:w-1/6 bg-white p-2 flex flex-row justify-center">
                <img src={dataObj.image} className="w-[120px]" alt="Product" />
            </figure>
            <div className="card-body p-4 w-5/6 w-full">
                <h1 className="card-title text-primary">{dataObj.title}</h1>
                <h3 className="text-accent">{dataObj.category}</h3>
                <p>{dataObj.description}</p>
                <div className="card-actions flex flex-row items-center justify-end">
                    <h2 className='text-secondary'>${dataObj.price}</h2>
                    <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductList;