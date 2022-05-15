import React, { FC } from 'react'
import { View } from 'react-native'
import { Headline, withTheme } from 'react-native-paper'

const CartScreen: FC = () => {
  return (
    <View>
      <Headline>This is the Cart Screen screen</Headline>
    </View>
  )
}

export default withTheme(CartScreen)