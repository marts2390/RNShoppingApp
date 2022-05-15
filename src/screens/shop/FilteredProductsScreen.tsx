import React, { FC, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native'
import { RootState } from 'store/rootReducer'

import ProductItemComponent from '../../components/ProductItem'
import { NavigationProps } from '../../models/navigationModel'
import { IProductModel } from '../../models/productModel'
import { getProductsByCategory } from '../../store/actions/product'

const FilteredProductsScreen:FC = () => {
  const products = useSelector((state: RootState) => state.products.availableProducts)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute<NavigationProps<'FilteredProductList'>>()
  const { filterType } = route.params
  const filteredProducts = products.filter((item: IProductModel) => item.category === filterType)

  useEffect(() => {
    dispatch(getProductsByCategory(filterType))
  }, [dispatch])

  return (
    <FlatList
      data={ filteredProducts }
      renderItem={ ({ item }) => (
        <ProductItemComponent
          key={ item.id }
          item={ item }
          onPress={ () => {
            navigation.navigate('ProductDetails', {
              productId: item.id,
              productTitle: item.title,
            })
          } }
        />
      ) }
    />
  )
}


export default FilteredProductsScreen