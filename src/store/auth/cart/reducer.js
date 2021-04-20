import { ADD_TO_CART, DELETE_STORE_FROM_CART, DELETE_PRODUCT_CART, DELETE_PRODUCTS_FROM_CART } from './actionTypes';

const initialState = {
    countercart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let counter = state.countercart;
            let product = counter.find(x => x.id == action.id.id)
            if (product) {
                debugger
                product.count+= action.id.counter??1
            }
            else {
                action.id.count = action.id.counter??1
                counter.push(action.id)
            }
            state = {
                ...state,
                countercart: [...counter]
            }
            break
        case DELETE_STORE_FROM_CART:
            state = {
                ...state,
                countercart: [...state.countercart.filter(c => c.store !== action.id)]
            }

            break
        case DELETE_PRODUCT_CART:
            let counterDelete = state.countercart;
            let productDelete = counterDelete.find(x => x.id == action.id.id)
            if (productDelete)
                if (productDelete.count > 1)
                    productDelete.count--

            state = {
                ...state,
                countercart: [...counterDelete]
            }
            break
        case DELETE_PRODUCTS_FROM_CART:
            state = {
                ...state,
                countercart: [...state.countercart.filter(c => c.id !== action.id)]
            }
            break

    }
    localStorage.setItem("cart", JSON.stringify(state.countercart))
    return state;
}

export default cart;