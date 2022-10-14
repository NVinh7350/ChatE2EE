import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CircleImage from '../circleImage';
import styles from './styles';
const handleMessage = (message) => {
    if (!message)
    return '';
    return message.length > 24 ? message.slice(0,20).concat('...') : message
}
export default FieldItem = ({
    containerStyle,
    state,
    userName,
    lastMessage,
    timeMessage,
    seen,
    onPress,
    containerImageStyle,
    imageStyle,
    source,
    textStyle,

}) => {
    
    var border = seen === true ? 'bold' : 'normal'
    return (
        <View style={ [styles.containerItem, containerStyle] }>
            <TouchableOpacity
                style= {{
                    flexDirection: 'row',
                    alignItems: 'center'}}
                onPress={ onPress }
            >
                <CircleImage
                    source= {source}
                    state= {state}
                    containerStyle= {[containerImageStyle]}
                    imageStyle= {imageStyle}
                />
                
                <View style={ styles.textArea}>
                    <Text style={[ styles.textLarge , {fontWeight: border}, textStyle]}>
                        {handleMessage(userName)}
                    </Text>
                    
                    {
                        lastMessage ?
                        <Text style={[ styles.textMedium, {fontWeight: border} ]}>
                        {`${handleMessage(lastMessage)} ${timeMessage}`}
                        </Text> :
                        <View></View>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}