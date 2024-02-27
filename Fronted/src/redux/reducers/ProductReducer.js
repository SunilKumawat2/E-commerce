import * as types from "../types";

const initialState = {
    ProductList: [],
    ProductDetailsList: [],
    status: 'idle',
    error: null
};

 const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PRODUCT_DETAILS_LIST:
            return{
                ...state,
                ProductDetailsList:action.payload,
            }
        case types.SET_PRODUCT_LIST:
            return {
                ...state,
                ProductList: action.payload,
            };
        case types.FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                status: "loading"
            }
        case types.FETCH_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                status: "succeeded"
            }
        case types.FETCH_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                status: "failed",
                error: action.payload,
            };
            default:
                return state
       
}
}
export default ProductReducer;