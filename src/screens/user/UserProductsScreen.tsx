import React, { FC } from 'react'
import { View } from 'react-native'
import { Headline, withTheme } from 'react-native-paper'

const UserProductsScreen:FC = () => {
  return (
    <View>
      <Headline>This is the User Product screen</Headline>
    </View>
  )
}

export default withTheme(UserProductsScreen)