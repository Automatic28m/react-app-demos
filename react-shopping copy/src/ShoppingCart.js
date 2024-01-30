import Navbar from "./components/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "./selectors/cartSelectors";
import { useEffect } from "react";
function ShoppingCart() {
    const cartItems = useSelector(selectCartItems);

    const [page, setPage] = useState('ShoppingCart');
    const [total, setTotal] = useState(0);

    // Calculate the total price of items in the cart
    const calculateTotal = () => {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice);
    };

    // Call calculateTotal whenever cartItems change
    useEffect(() => {
        calculateTotal();
    }, [cartItems]);


    return (
        <div className="container-fluid">
            <Navbar page={page} />
            <div className="container">
                <h1>Shopping cart</h1>
                <p>{cartItems.length} products in your cart</p>
                <div>
                    {cartItems.map((item, index) => (
                        <>
                            <div className="d-flex align-items-center mb-3 gap-3" key={index}>
                                <img width="100px" src={item.image} />
                                <div className="d-flex flex-column justify-content-center">
                                    <h3>{item.title}</h3>
                                    <p className='text-primary'>${item.price}</p>
                                </div>
                            </div>
                            <hr/>
                        </>
                    ))}
                </div>
                <p>Total : ${total}</p>
            </div>
        </div>
    )
}

export default ShoppingCart;