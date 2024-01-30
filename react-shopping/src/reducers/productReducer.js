const initialState = {
    cartItems: [],
  };

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.product],
            };
        default:
            return state;
    }
}

export default productReducer;