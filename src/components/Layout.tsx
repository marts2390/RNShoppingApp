import React, { FC, ReactElement, useEffect, useRef } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Animated } from 'react-native'

interface ILayoutComponentProps {
  children: ReactElement;
}

const LayoutComponent: FC<ILayoutComponentProps> = ({
  children
}) => {
  const insets = useSafeAreaInsets()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={ {
        opacity: fadeAnim,
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      } }
    >
      {children}
    </Animated.View>
  )
}

export default LayoutComponent