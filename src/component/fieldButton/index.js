import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
const fieldButton = ({
    onPress, 
    title,
    containerStyle,
    textStyle,
    
}) => {
return (
      <TouchableOpacity 
        onPress={onPress}
        style= {[styles.containerButton, containerStyle]}
        >
        <Text 
        style= {[styles.textButton, textStyle]}
        >{title}</Text>
      </TouchableOpacity>
  )
}
export default fieldButton;