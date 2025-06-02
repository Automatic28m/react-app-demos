const initialState = {
    cartItems: [],
    totalPrice: 0,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [], // Reset cartItems to an empty array
                totalPrice: 0, // Optionally reset totalPrice to 0
            };
        case 'UPDATE_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.totalPrice,
            }
        case 'ADD_TO_CART':
            if (!action.product || !action.product.id) return state; // Skip invalid products
            return {
                ...state,
                cartItems: [...state.cartItems, action.product],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
        case 'DECREASE_FROM_CART':
            const updatedCartItems = [...state.cartItems]; // Create a copy of the cartItems array
            for (let i = 0; i < updatedCartItems.length; i++) {
                if (updatedCartItems[i].id === action.payload) {
                    updatedCartItems.splice(i, 1); // Remove the item at index `i`
                    break; // Exit the loop after removing the item
                }
            }
            return {
                ...state,
                cartItems: updatedCartItems, // Update the cartItems array
            };
        default:
            return state;
    }
};

export default productReducer;