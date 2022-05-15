export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SAVE_PRODUCT = 'SAVE_PRODUCT'
export const REMOVE_SAVED_PRODUCT = 'REMOVE_SAVED_PRODUCT'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const INIT_DATA_LOAD = 'INIT_DATA_LOAD'
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
export const IS_LOADING = 'IS_LOADING'
export const LOAD_MORE = 'LOAD_MORE'

import { IProductModel } from '../../models/productModel'
import { ICategoryModel } from '../../models/categoryModel'
import { Dispatch } from 'redux'

export const initDataLoad = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: IS_LOADING, isLoading: true })

    const getProducts = await fetch(
      'https://fakestoreapi.com/products'
    )

    const getCategories = await fetch(
      'https://fakestoreapi.com/products/categories'
    )

    const products = await getProducts.json()
    const categories = await getCategories.json()

    const catObjs: ICategoryModel = categories.map((item: string) => {
      const catImage = products.filter((prod: IProductModel) => prod.category === item)

      return {
        name: item,
        imageUrl: catImage[0] && catImage[0].image
      }
    })

    dispatch({ type: INIT_DATA_LOAD, products: products, categories: catObjs })
    dispatch({ type: IS_LOADING, isLoading: false })
  }
}

export const getProducts = () => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      'https://fakestoreapi.com/products'
    )

    const resData = await response.json()

    const products = resData.map((item: IProductModel) => {
      return {
        ...item,
        saved: false,
      }
    })

    dispatch({ type: GET_PRODUCTS, products: products })
  }
}

export const getProductsByCategory = (category: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)

    const resData = await response.json()

    dispatch({ type: GET_PRODUCTS_BY_CATEGORY, products: resData })
  }
}

export const getCategories = () => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      'https://fakestoreapi.com/products/categories'
    )

    const resData = await response.json()

    dispatch({ type: GET_CATEGORIES, categories: resData })
  }
}

export const saveProduct = (productId: number) => {
  return {
    type: SAVE_PRODUCT,
    productId: productId,
  }
}

export const removeSavedProduct = (productId: number) => {
  return {
    type: REMOVE_SAVED_PRODUCT,
    productId: productId,
  }
}
