import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'
const FieldButton = ({
    onPress, 
    title,
    containerStyle,
    textStyle,
    source,
    iconStyle
}) => {
return (
      <TouchableOpacity 
        onPress={onPress}
        style= {[styles.containerButton, containerStyle]}
        >
       {
        source ? <Image
        style= {[styles.icon, iconStyle]}
        source = {source}>
        </Image>:
        <View></View>
       }
        <Text 
        style= {[styles.textButton, textStyle]}
        >{title}</Text>
      </TouchableOpacity>
  )
}
export default FieldButton;