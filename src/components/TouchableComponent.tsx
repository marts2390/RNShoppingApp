import React, { FC, ReactElement } from 'react'
import { TouchableOpacity, Platform, TouchableNativeFeedback, ViewStyle } from 'react-native'

interface ITouchableComponentProps {
    children: ReactElement;
    style?: ViewStyle;
    onPress: () => void;
}

const TouchableComponent:FC<ITouchableComponentProps> = ({
  children,
  style,
  onPress
}) => {
  return (
    <>
      {Platform.OS === 'android' && Platform.Version >= 21 ? (
        <TouchableNativeFeedback
          style={ { overflow: 'hidden', ...style } }
          onPress={ onPress }
        >
          {children}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity
          style={ { overflow: 'hidden', ...style } }
          onPress={ onPress }
        >
          {children}
        </TouchableOpacity>
      )}
    </>
  )
}

export default TouchableComponent