import React, { FC } from 'react'
import { View } from 'react-native'
import { Headline, withTheme } from 'react-native-paper'

const EditProductsScreen:FC = () => {
  return (
    <View>
      <Headline>This is the Edit Product screen</Headline>
    </View>
  )
}

export default withTheme(EditProductsScreen)