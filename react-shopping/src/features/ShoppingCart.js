import { NewNavbar } from "../components/NewNavbar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems } from "../selectors/cartSelectors";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import CheckoutFooter from "../components/CheckoutFooter";
function ShoppingCart() {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    console.log(cartItems);

    const removeFromCart = (id) => {
        return {
            type: 'REMOVE_FROM_CART',
            payload: id,
        }
    };

    const decreaseFromCart = (id) => {
        return {
            type: 'DECREASE_FROM_CART',
            payload: id,
        }
    };

    const addToCart = (product) => {
        return {
            type: 'ADD_TO_CART',
            product
        };
    };

    const updateTotalPrice = (totalPrice) => {
        return {
            type: 'UPDATE_TOTAL_PRICE',
            totalPrice
        }
    }

    const stackItemAmount = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item already exists
            } else {
                acc.push({ ...item, quantity: 1 }); // Add new item with quantity 1
            }
            return acc;
        }, []);
        return groupedItems;
    };

    const stackedItems = stackItemAmount(cartItems);

    // Call calculateTotal whenever cartItems change
    useEffect(() => {
        // Calculate the total price of items in the cart
        const calculateTotal = () => {
            const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
            dispatch(updateTotalPrice(totalPrice));
        };

        calculateTotal();
    }, [cartItems, dispatch]);



    return (
        <div className="container-fluid bg-gray-200 min-h-screen">
            <NewNavbar />
            <div className='container py-10 mx-auto max-w-5xl px-6'>
                <div id="header" className="flex flex-col gap-3 mb-5">
                    <h1 className="text-2xl">Shopping cart</h1>
                    <p>{cartItems.length} items in your cart</p>
                </div>
                <div>
                    {stackedItems.map((item, index) => (
                        <>
                            <div className="flex sm:flex-row flex-col align-items-center mb-3 gap-3 bg-white rounded shadow border-1 overflow-hidden p-4" key={index}>
                                <figure id="image" className="flex flex-row justify-center">
                                    <img className="" width="100px" src={item.image} alt="{item.image}" />
                                </figure>
                                <div id="card-body" className="flex flex-col justify-center w-full">
                                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                    <div id="item-per-price" className="flex flex-row align-items-center gap-3">
                                        <b>Price per item: </b>
                                        <p className='text-primary'>${item.price}</p>
                                    </div>
                                    <div id="item-amount" className="flex flex-row align-items-center gap-3">
                                        <b>Amount: </b>
                                        <p className='text-secondary'>{item.quantity}</p>
                                    </div>
                                </div>
                                <div id="action" className="flex flex-row items-center gap-3 justify-end">
                                    <button
                                        id="increase-item"
                                        className="btn text-sm bg-white border-none hover:bg-blue-300 hover:text-white"
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        +
                                    </button>
                                    <button
                                        id="decrease-item"
                                        className="btn text-sm bg-white border-none hover:bg-red-300 hover:text-white"
                                        onClick={() => dispatch(decreaseFromCart(item.id))}
                                    >
                                        -
                                    </button>
                                    <button
                                        id="remove-item"
                                        className="btn text-sm bg-white border-none hover:bg-red-300 hover:text-white"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}
                </div>
            </div>
            <CheckoutFooter />
        </div>
    )
}

export default ShoppingCart;