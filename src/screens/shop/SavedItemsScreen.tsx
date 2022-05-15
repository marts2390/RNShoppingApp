import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Headline } from 'react-native-paper'

import { IProductModel } from '../../models/productModel'
import Layout from '../../components/Layout'
import SavedListItem from '../../components/SavedListItem'
import { saveProduct } from '../../store/actions/product'

const SavedItemsScreen: FC = () => {
  const savedProductsIds = useSelector((state: RootState) => state.products.savedProductIds)
  const products = useSelector((state: RootState) => state.products.availableProducts)
  const savedItems = products.filter((item: IProductModel) => savedProductsIds.includes(item.id))
  const dispatch = useDispatch()

  const removeItemAction = (id: number) => {
    dispatch(saveProduct(id))
  }
  const moveToBasket = (id: number) =>  {
    console.log('added')
  }

  return (
    <Layout>
      <FlatList
        style={ styles.list }
        data={ savedItems }
        ListHeaderComponent={ () => (
          <>
            {savedItems.length !== 0 && (
              <Headline style={ { textAlign: 'center' } }>You Have {savedItems.length} Saved Item{savedItems.length === 1 ? '' : 's'}</Headline>
            )}
          </>
        ) }
        ListEmptyComponent={ () => (
          <Headline style={ { textAlign: 'center' } }>No saved items</Headline>
        ) }
        renderItem={ (data) => {
          return (
            <View style={ { overflow: 'hidden', height: 120 } }>
              <SavedListItem
                item={ data.item }
                removeItemAction={ removeItemAction }
                moveToBasket={ moveToBasket }
              />
            </View>
          )
        } }
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
})

export default SavedItemsScreen