import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { createStackNavigator } from '@react-navigation/stack'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen'
import FilteredProductsScreen from '../screens/shop/FilteredProductsScreen'
import SavedItemsScreen from '../screens/shop/SavedItemsScreen'
import CartScreen from '../screens/shop/CartScreen'

import { INavigationModel } from '../models/navigationModel'
import { IBottomTabsNavigationModel } from '../models/tabNavigationModel'

const SharedStack = createSharedElementStackNavigator<INavigationModel>()
const Stack = createStackNavigator<INavigationModel>()
const Tabs = createBottomTabNavigator<IBottomTabsNavigationModel>()

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
})

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
}

const SavedProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={ {
        headerBackTitleStyle: {
          fontFamily: "font-light",
          fontSize: 12,
        },
        headerTitleStyle: {
          textTransform: 'capitalize',
        },
        headerShown: false,
      } }
    >
      <Stack.Screen
        name="ProductList"
        component={ SavedItemsScreen }
        options={ {
          title: 'Saved List'
        } }
      />
    </Stack.Navigator>
  )
}

const ProductsNavigator = () => {
  return (
    <SharedStack.Navigator
      screenOptions={ {
        headerBackTitleStyle: {
          fontFamily: "font-light",
          fontSize: 12,
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          textTransform: 'capitalize',
        },
        headerShown: false,
        cardStyleInterpolator: forFade
      } }
    >
      <SharedStack.Screen
        name="ProductList"
        component={ ProductOverviewScreen }
        options={ {
          title: 'All Products'
        } }
      />
      <SharedStack.Screen
        name="FilteredProductList"
        component={ FilteredProductsScreen }
        options={ ({ route }) => ({
          tabBarOptions: {
            upperCaseLabel: true,
          },
          headerTintColor: 'black',
          headerTitle: route.params.filterType,
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }) }
      />
      <SharedStack.Screen
        name="ProductDetails"
        component={ ProductDetailsScreen }
        sharedElements={ (route) => {
          const { productId } = route.params

          return [`${productId}-photo`, `${productId}-heart`, `${productId}-title`]
        } }
      />
    </SharedStack.Navigator>
  )
}

const BottomTabsNavigator = () => {
  const savedProductsIds = useSelector((state: RootState) => state.products.savedProductIds)
  const savedItemsBadge = (route: string) => {
    if (route === 'SavedItems' && savedProductsIds.length !== 0) {
      return savedProductsIds.length
    }

    return undefined
  }

  return (
    <NavigationContainer theme={ MyTheme }>
      <Tabs.Navigator
        screenOptions={ ({ route }) => ({
          tabBarLabel: '',
          tabBarColor: '#009387',
          tabBarBadge: savedItemsBadge(route.name),
          tabBarIcon: ({ focused, size }) => {
            let iconName: any = 'ios-shirt'

            switch(route.name) {
              case 'ProductList':
                iconName = focused ? 'ios-shirt' : 'ios-shirt-outline'
                break

              case 'SavedItems':
                iconName = focused ? "ios-heart" : "ios-heart-outline"
                break

              case 'CartItems':
                iconName = focused ? "ios-cart" : "ios-cart-outline"
                break
            }

            return (
              <Ionicons
                name={ iconName }
                size={ size }
                color='black'
              />
            )
          },
        }) }
      >
        <Tabs.Screen
          name="ProductList"
          component={ ProductsNavigator }
        />
        <Tabs.Screen
          name="SavedItems"
          component={ SavedProductsNavigator }
        />
        <Tabs.Screen
          name="CartItems"
          component={ CartScreen }
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}


export default BottomTabsNavigator