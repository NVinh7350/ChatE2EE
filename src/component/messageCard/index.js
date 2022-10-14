import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { color } from '../../utility'
import { getAsyncStorage, keys } from '../../asyncStorage'
export default MessageCard = (
    {
        messageContent,
        senderBy,
        messageTime
    }
) => {
    return (
    <View style={[styles.containerMessage, {alignSelf: senderBy ? "flex-end" : "flex-start"
    ,borderBottomLeftRadius: senderBy? 20: 2, borderBottomRightRadius: senderBy?2:20
    ,backgroundColor: senderBy ? color.BLUE_DARK : color.GRAY_CLOUD 
}
    ]}>
        <Text style= {[styles.textMessage, {
            color: senderBy ? color.GRAY_CLOUD : color.BLACK
        }]}>{messageContent}</Text>
    </View>
  )
}