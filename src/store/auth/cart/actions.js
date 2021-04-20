import { ADD_TO_CART, DELETE_STORE_FROM_CART, DELETE_PRODUCT_CART, DELETE_PRODUCTS_FROM_CART} from './actionTypes';

export const addToCart = id => ({
    type: ADD_TO_CART,
    id: id
})

export const deleteStoreFromCart = id => ({
    type: DELETE_STORE_FROM_CART,
    id
})

export const deleteProductCart = id => ({
    type: DELETE_PRODUCT_CART,
    id
})

export const delete_products_from_cart = id => ({  
    type: DELETE_PRODUCTS_FROM_CART,
    id
})
