import React, { FC, useEffect } from 'react'
import { registerRootComponent } from 'expo'
import { Provider } from 'react-native-paper'
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font'
import theme from './commons/theme'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider as ReduxProvider } from 'react-redux'
import { useDispatch } from 'react-redux'
import { rootReducer } from './store/rootReducer'
import AppNavigator from './navigation/ShopNavigator'
import { initDataLoad } from './store/actions/product'

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App:FC = () => {
  const [fontsLoaded] = useFonts({
    "font-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "font-regular": require("../assets/fonts/Roboto-Bold.ttf"),
    "font-light": require("../assets/fonts/Roboto-Light.ttf"),
    "font-thin": require("../assets/fonts/Roboto-Thin.ttf"),
  })

  if (!fontsLoaded) {
    return (<AppLoading />)
  }

  return (
    <ReduxProvider store={ store }>
      <Provider theme={ theme }>
        <AppContent />
      </Provider>
    </ReduxProvider>
  )
}

const AppContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initDataLoad())
  }, [])

  return (
    <AppNavigator />
  )
}

export default registerRootComponent(App)