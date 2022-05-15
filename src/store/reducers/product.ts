import { IProductModel } from '../../models/productModel'
import { ICategoryModel } from '../../models/categoryModel'

import {
  GET_PRODUCTS,
  SAVE_PRODUCT,
  GET_CATEGORIES,
  INIT_DATA_LOAD,
  GET_PRODUCTS_BY_CATEGORY,
  IS_LOADING,
  REMOVE_SAVED_PRODUCT,
} from '../actions/product'

interface IProductState {
  availableProducts: IProductModel[],
  savedProductIds: number[],
  categories: ICategoryModel[],
  loading: boolean;
}

const initialState: IProductState = {
  availableProducts: [],
  savedProductIds: [],
  categories: [],
  loading: false,
}

const productReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case INIT_DATA_LOAD:
      return { ...state, availableProducts: action.products, categories: action.categories }

    case GET_PRODUCTS:
      return { ...state, availableProducts: action.products }

    case SAVE_PRODUCT:
      const savedProducts = [...state.savedProductIds]
      const getIndex = savedProducts.findIndex((item) => item === action.productId)

      if (getIndex >= 0) {
        savedProducts.splice(getIndex, 1)
      } else {
        savedProducts.push(action.productId)
      }

      return { ...state, savedProductIds: savedProducts }

    case REMOVE_SAVED_PRODUCT:
      const removeSavedProduct = state.savedProductIds.filter((item) => item !== action.productId)

      return { ...state, savedProductIds: removeSavedProduct }

    case GET_CATEGORIES:
      return { ...state, categories: action.categories }

    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, availableProducts: action.products }

    case IS_LOADING:
      return { ...state, loading: action.isLoading }

    default:
      return state
  }
}

export default productReducer