import { useSelector } from "react-redux"
import { NewNavbar } from "../components/NewNavbar"
import { selectCartItems, selectTotalPrice } from "../selectors/cartSelectors"
import { Link } from "react-router-dom";

export default function ReceiptPage() {

    const cartItems = useSelector(selectCartItems);
    const dateTime = new Date().toLocaleString();
    const totalPrice = useSelector(selectTotalPrice);

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

    return (
        <div className="container-fluid bg-gray-200 min-h-screen">
            <NewNavbar />
            <div className='container py-10 mx-auto max-w-5xl px-6'>
                <div id="header" className="flex flex-col gap-3 mb-5">
                    <h1 className="text-2xl">Reciept</h1>
                    <p>Thank you for your purchase from our React Online Shop</p>
                </div>
                <div id="body" className="text-xs md:text-lg">
                    <div className="flex flex-row gap-2">
                        <p>Date: </p>
                        <p>{dateTime}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>Purchase ID:</p>
                        <p>123456789</p>
                    </div>
                    <div className="grid grid-cols-6 gap-2 font-bold">
                        <div id="title" className="col-span-3">Item</div>
                        <div id="price/item" className="text-end col-span-2">Price</div>
                        <div id="total" className="text-end">Total</div>
                    </div>
                    {stackedItems.map((item, index) => (
                        <div className="grid grid-cols-6 gap-2 items-end">
                            <div id="title" className="col-span-3">{item.title}</div>
                            <div id="title" className="text-end col-span-2">${item.price} x{item.quantity}</div>
                            <div id="total" className="text-end">${item.price * item.quantity}</div>
                        </div>
                    ))}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                        <div id="title" className="col-span-3 font-bold">Net Total</div>
                        <div id="netTotal" className="text-end">${totalPrice ? totalPrice.toFixed(2) : '0.00'}</div>
                    </div>
                    <div className="flex flex-row justify-end mt-16">
                        <Link to="/" className="btn btn-primary">Shop more</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}