import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native'
import * as Progress from 'react-native-progress'

import { getProducts } from '../../store/actions/product'
import Layout from '../../components/Layout'
import ProductItemComponent from '../../components/ProductItem'
import CategoriesList from '../../components/CategoriesList'

const ProductOverviewScreen: FC = () => {
  const products = useSelector((state: RootState) => state.products.availableProducts)
  const categories = useSelector((state: RootState) => state.products.categories)
  const isLoading = useSelector((state: RootState) => state.products.loading)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(getProducts())
  }, [isFocused])

  if (isLoading) {
    return (
      <Progress.Circle
        style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
        size={ 100 }
        borderWidth={ 10 }
        indeterminate={ true }
      />
    )
  } else {
    return (
      <Layout>
        <FlatList
          data={ products }
          ListHeaderComponent={ () => (
            <CategoriesList categories={ categories } />
          ) }
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
      </Layout>
    )
  }
}

export default ProductOverviewScreen