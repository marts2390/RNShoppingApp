import { DefaultTheme, configureFonts } from 'react-native-paper'
import Colors from '../constants/Colors'

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'font-regular',
    },
    medium: {
      fontFamily: 'font-medium',
    },
    light: {
      fontFamily: 'font-light',
    },
    thin: {
      fontFamily: 'font-thin',
    },
  },
  android: {
    regular: {
      fontFamily: 'font-regular',
    },
    medium: {
      fontFamily: 'font-medium',
    },
    light: {
      fontFamily: 'font-light',
    },
    thin: {
      fontFamily: 'font-thin',
    },
  }
}

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
    text: 'black',
    background: 'white',
  },
}

export default theme