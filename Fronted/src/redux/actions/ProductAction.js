import * as types from "../types";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
export const setProductList = (data)=>({
    type:types.SET_PRODUCT_LIST,
    payload:data
});

export const setProductDetailsList = (data)=>({
    type:types.SET_PRODUCT_DETAILS_LIST,
    payload:data
})


export const fetchProductListRequest = ()=>({
    type:types.FETCH_PRODUCT_REQUEST
})

export const fetchProductListSuccess = (data)=>({
    type:types.FETCH_PRODUCT_LIST_SUCCESS,
    payload:data
});

export const fetchProductListFailure = (error)=>({
    type:types.FETCH_PRODUCT_LIST_FAILURE,
    payload:error
});
// <---------- Retrive  the ProductList ------------>
export const fetchProductList = ()=> async (dispatch)=>{
    try{
        dispatch(fetchProductListRequest());
        await axios.get(`${API_BASE_URL}/Product/get`).then((response)=>{
            dispatch(setProductList(response.data.data));
            dispatch(fetchProductListSuccess());
    })
    }catch(error){
        console.log(error);
        dispatch(fetchProductListFailure(error))
    }

}

export const fetchProductDetails = (_id)=> async (dispatch)=>{
    try{
        dispatch(fetchProductListRequest());
        await axios.get(`${API_BASE_URL}/ProductDetails/getById/${_id}`).then((response)=>{
            dispatch(setProductDetailsList(response.data.data.ProductDetailsList));
            dispatch(fetchProductListSuccess());
        })
    }catch(error){
        console.log(error);
        dispatch(fetchProductListFailure(error))
    }
}

export const fetchProductAllDetails = ()=>async (dispatch)=>{
    try{
        await axios.get(`${API_BASE_URL}/ProductDetails/get`).then((response)=>{
            dispatch(setProductDetailsList(response.data.data));
            dispatch(fetchProductListSuccess());
        })
    }catch(error){
           console.log(error);
        dispatch(fetchProductListFailure(error))
    }
  
}