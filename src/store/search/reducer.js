import { SEARCH_VALUES, SEARCH_PRODUCT } from './actionsTypes'

const initialState = {
    keyWord: null,
    searchType: SEARCH_PRODUCT,
    searchValue: null
}

const search = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUES:
            state = { ...state, ...action.payload }
            break;
        default: state = { ...state };
    }
    return state;
}

export default search;