import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { RootState } from 'store/rootReducer'
import { useTheme, Headline, Paragraph } from 'react-native-paper'
import { SharedElement } from 'react-navigation-shared-element'
import { Ionicons } from "@expo/vector-icons"
import { Rating } from 'react-native-ratings'
import { useRoute, useNavigation } from '@react-navigation/native'

import { IProductModel } from '../../models/productModel'
import { saveProduct } from '../../store/actions/product'
import { Theme } from 'react-native-paper/src/types'
import { NavigationProps } from '../../models/navigationModel'
import Layout from '../../components/Layout'

const ProductDetailScreen:FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const styles = useStyles(theme)
  const navigation = useNavigation()
  const route = useRoute<NavigationProps<'ProductDetails'>>()
  const products = useSelector((state: RootState) => state.products.availableProducts)
  const { productId } = route.params
  const selectedProduct = products.filter((product: IProductModel) => product.id === productId)[0]
  const savedItems = useSelector((state: RootState) => state.products.savedProductIds)
  const isItemSaved = savedItems.includes(selectedProduct.id)

  const handleSavePress = (id: number) => {
    dispatch(saveProduct(id))
  }

  return (
    <Layout>
      <ScrollView>
        <Ionicons
          style={ styles.backIcon }
          name="arrow-back"
          size={ 24 }
          color="black"
          onPress={ navigation.goBack }
        />
        <SharedElement id={ `${selectedProduct.id}-photo` }>
          <ImageBackground
            style={ styles.image }
            resizeMode='contain'
            source={ { uri: selectedProduct.image } }
          />
        </SharedElement>
        <View style={ styles.content }>
          <View style={ styles.header }>
            <Headline style={ styles.headerText }>{selectedProduct.title}</Headline>
            <SharedElement id={ `${selectedProduct.id}-heart` }>
              <Ionicons
                style={ { marginTop: 5 } }
                name={ isItemSaved ? "ios-heart" : "ios-heart-outline" }
                size={ 24 }
                color="black"
                onPress={ () => handleSavePress(selectedProduct.id) }
              />
            </SharedElement>
          </View>
          <Paragraph style={ styles.description }>{selectedProduct.description}</Paragraph>
          <View style={ styles.ratings }>
            <Rating
              readonly
              ratingBackgroundColor="black"
              imageSize={ 15 }
              ratingCount={ 5 }
              startingValue={ selectedProduct.rating.rate }
            />
            <Paragraph style={ styles.ratingText }>{selectedProduct.rating.rate}</Paragraph>
            <Paragraph style={ styles.ratingText }>{`(${selectedProduct.rating.count})`}</Paragraph>
          </View>
        </View>
      </ScrollView>
    </Layout>
  )
}

const useStyles = (theme: Theme) => StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    margin: 20,
  },
  backIcon: {
    opacity: 0.5,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    width: "85%",
  },
  description: {
    ...theme.fonts.light,
    paddingVertical: 10,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...theme.fonts.light,
    marginLeft: 5,
  }
})

export default ProductDetailScreen