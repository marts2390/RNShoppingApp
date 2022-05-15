import React, { FC } from 'react'
import { ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Subheading, useTheme } from 'react-native-paper'
import { ICategoryModel } from '../models/categoryModel'
import { Theme } from 'react-native-paper/src/types'
import { useNavigation } from '@react-navigation/native'
import { FlatGrid } from 'react-native-super-grid'

interface ICategoriesListComponentProps {
  categories: ICategoryModel[];
}

const CategoriesListComponent: FC<ICategoriesListComponentProps> = ({
  categories,
}) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const navigation = useNavigation()
  const { navigate } = navigation

  return (
    <View
      style={ styles.container }
    >
      <FlatGrid
        data={ categories }
        spacing={ 10 }
        renderItem={ ({ item }) => (
          <TouchableOpacity
            onPress={ () => {
              navigate('FilteredProductList', {
                filterType: item.name,
              })
            } }
          >
            <ImageBackground
              source={ { uri: item.imageUrl } }
              resizeMode='contain'
              key={ item.name }
              style={ styles.card }
            >
              <View style={ styles.content }>
                <Subheading style={ styles.text }>{item.name}</Subheading>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) }
      />
    </View>
  )
}

const useStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap'
  },
  card: {
    height: 175,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  content: {
    height: '100%',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  text: {
    color: 'white',
    textTransform: 'capitalize',
  }
})

export default CategoriesListComponent