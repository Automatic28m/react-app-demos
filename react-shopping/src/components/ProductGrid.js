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
        <div className="card w-full border-1 shadow bg-white" key={index}>
            <div className="flex flex-row items-center justify-center h-[200px]">
                <figure className="bg-white  p-2 w-[120px]">
                    <img src={dataObj.image} className="" alt="Product" />
                </figure>
            </div>
            <div className="card-body p-3">
                <h1 className="card-title text-primary">{dataObj.title}</h1>
                <h3 className="text-accent">{dataObj.category}</h3>
                <p className="line-clamp-3">{dataObj.description}</p>
                <div className="flex flex-row items-center card-actions justify-end">
                    <h1 className='text-secondary'>${dataObj.price}</h1>
                    <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductGrid;