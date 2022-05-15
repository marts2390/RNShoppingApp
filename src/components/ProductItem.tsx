import React, { FC } from 'react'
import { StyleSheet, ImageBackground, View, TouchableWithoutFeedback, Animated } from 'react-native'
import { Subheading, Surface, useTheme, Paragraph } from 'react-native-paper'
import { Theme } from 'react-native-paper/src/types'
import { Ionicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux'

import { SharedElement } from 'react-navigation-shared-element'
import { saveProduct } from '../store/actions/product'
import { IProductModel } from '../models/productModel'
import { RootState } from 'store/rootReducer'

interface IProductItemComponentProps {
  item: IProductModel;
  onPress: () => void;
}

const ProductItemComponent: FC<IProductItemComponentProps> = ({
  item,
  onPress,
}) => {
  const savedItems = useSelector((state: RootState) => state.products.savedProductIds)
  const isItemSaved = savedItems.includes(item.id)
  const theme = useTheme()
  const styles = useStyles(theme)
  const dispatch = useDispatch()

  const handleSavePress = (id: number) => {
    dispatch(saveProduct(id))
  }

  return (
    <View>
      <Surface style={ styles.productItem }>
        <View>
          <TouchableWithoutFeedback onPress={ onPress }>
            <SharedElement id={ `${item.id}-photo` }>
              <ImageBackground
                style={ styles.image }
                source={ { uri: item.image } }
                resizeMode='contain'
                imageStyle={ { borderRadius: theme.roundness } }
              />
            </SharedElement>
          </TouchableWithoutFeedback>
          <View style={ styles.productDetails }>
            <Subheading>£{item.price}</Subheading>
            <SharedElement id={ `${item.id}-heart` }>
              <Ionicons
                name={ isItemSaved ? "ios-heart" : "ios-heart-outline" }
                size={ 24 }
                color="black"
                onPress={ () => handleSavePress(item.id) }
              />
            </SharedElement>
          </View>
          <Paragraph style={ styles.itemName }>{item.title}</Paragraph>
        </View>
      </Surface>
    </View>
  )
}

const useStyles = (theme: Theme) => StyleSheet.create({
  productItem: {
    elevation: 0,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 30,
    borderRadius: theme.roundness,
  },
  image: {
    height: 300,
    width: '100%',
  },
  productDetails: {
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    ...theme.fonts.light,
    paddingBottom: 20,
  }
})

export default ProductItemComponent
