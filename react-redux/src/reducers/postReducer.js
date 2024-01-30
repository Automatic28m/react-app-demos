const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'DELETE_POST':
            return state.filter((prmPost) => prmPost.id !== action.id);
        case 'EDIT_POST':
            return state.map((prmPost) => prmPost.id === action.id ? {...prmPost, editting: !prmPost.editting} : prmPost);
        case 'UPDATE':
            return state.map((prmPost) => {
                if(prmPost.id === action.id) {
                    return {
                        ...prmPost,
                        title: action.data.newTitle,
                        message: action.data.newMessage,
                        editting: !prmPost.editting
                    }
                }
            })
        default:
            return state;
    }
}

export default postReducer;