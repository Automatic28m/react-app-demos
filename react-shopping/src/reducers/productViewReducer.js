const initialState = 'list';

const productViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            return action.payload;
        default:
            return state;
    };
};

export default productViewReducer;