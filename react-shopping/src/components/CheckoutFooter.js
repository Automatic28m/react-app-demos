import { useSelector } from "react-redux"
import { selectCartItems, selectTotalPrice } from "../selectors/cartSelectors"
import { Link } from "react-router-dom";

export default function CheckoutFooter() {
    const totalPrice = useSelector(selectTotalPrice);
    const cartItems = useSelector(selectCartItems);

    return (
        <div id="checkout-footer" className="flex flex-row bottom-0 absolute h-fit bg-primary w-full p-8 text-white justify-between">
            <div id="left-section">
                <div className="grid grid-cols-2 items-center">
                    <p className="">Items : </p>
                    <p className="text-xl">{cartItems ? cartItems.length : '0'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p className="">Total : </p>
                    <p className="text-xl">${totalPrice ? totalPrice.toFixed(2) : '0.00'}</p>
                </div>
            </div>
            <div>
                {cartItems.length > 0 ? (
                    <Link to="/ReceiptPage" className="btn">Checkout</Link>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}