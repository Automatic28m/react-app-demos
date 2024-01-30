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
        <div className='card p-3 my-3' >
            <div key={index} className='d-flex align-items-center gap-5'>
                <div className='image'>
                    <img width="200px" src={dataObj.image} />
                </div>
                <div className='content'>
                    <h1>{dataObj.title}</h1>
                    <h3>{dataObj.category}</h3>
                    <p>{dataObj.description}</p>
                    <h2 className='text-primary'>${dataObj.price}</h2>
                    <button className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductList;