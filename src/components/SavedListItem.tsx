import React, { FC } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Paragraph } from 'react-native-paper'
import { Ionicons } from "@expo/vector-icons"
import { RectButton } from 'react-native-gesture-handler'

import { IProductModel } from '../models/productModel'
import TouchableComponent from './TouchableComponent'

const ROW_HEIGHT = 120

if (
  Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface ISavedListItemComponentProps {
    item: IProductModel;
    removeItemAction: (id: number) => void;
    moveToBasket: (id: number) => void;
}

const SavedListItemComponent:FC<ISavedListItemComponentProps> = ({
  item,
  removeItemAction,
  moveToBasket
}) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  const { image, title, price, id } = item
  const height = new Animated.Value(1)
  const opacity = new Animated.Value(1)
  const handleDeletePress = (id: number) => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: -100,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ]).start(() => {
      removeItemAction(id)
    })
  }

  const renderRightAction = (
    x: number,
    progress: any,
    backgroundColor: string,
    icon: any,
    onPress: (id: number) => void
  ) => {
    const trans = progress.interpolate({
      inputRange:[0, 1],
      outputRange:[x, 0],
      extrapolate:'clamp'
    })

    return (
      <Animated.View style={ { ...styles.rightButtonContainer, transform: [{ translateX: trans }] } }>
        <TouchableComponent
          onPress={ () => onPress(id) }
          style={ { overflow: 'visible', width: '90%' } }
        >
          <RectButton style={ { ...styles.rightButton, backgroundColor: backgroundColor } }>
            <Ionicons
              name={ icon }
              size={ 34 }
              color="white"
            />
          </RectButton>
        </TouchableComponent>
      </Animated.View>
    )
  }

  const renderRightActions = (progress) => (
    <View style={ { width: 120, flexDirection: 'row' } }>
      {renderRightAction(192, progress, 'red', 'ios-remove-circle', handleDeletePress )}
      {renderRightAction(128, progress, 'green', 'ios-basket', moveToBasket)}
    </View>
  )

  return (
    <Animated.View
      style={ {
        opacity: opacity,
        transform: [{ translateY: height }],
      } }
    >
      <Swipeable
        renderRightActions={ renderRightActions }
        rightThreshold={ 40 }
        friction={ 2 }
      >
        <Animated.View style={ { ...styles.listItem } }>
          <View style={ { width: '30%' } }>
            <Image
              source={ { uri: image } }
              style={ styles.itemImage }
              resizeMode='contain'
            />
          </View>
          <View style={ styles.listItemDetails }>
            <Paragraph>{title}</Paragraph>
            <Paragraph>£{price}</Paragraph>
          </View>
        </Animated.View>
      </Swipeable>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 20,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
  },
  itemImage: {
    width: 75,
    height: 75,
  },
  itemText: {
    overflow: 'hidden'
  },
  listItemDetails: {
    width: '70%',
    justifyContent: 'space-between'
  },
  rightButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    borderRadius: 10,
  }
})

export default SavedListItemComponent