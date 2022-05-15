import React, { FC } from 'react'
import { View } from 'react-native'
import { Headline, withTheme } from 'react-native-paper'

const OrderScreen: FC = () => {
  return (
    <View>
      <Headline>This is the Order screen</Headline>
    </View>
  )
}

export default withTheme(OrderScreen)