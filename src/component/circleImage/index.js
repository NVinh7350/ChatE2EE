import { TouchableOpacity, View, Image,Dimensions } from 'react-native'
import styles from './styles'
import React from 'react'
import StateIcon from '../stateIcon'

export default CircleImage = ({
    onPress, 
    containerStyle,
    imageStyle,
    source,
    state,

}) => {
    return !onPress ?  
    (<View 
        style={[styles.containerImage, containerStyle]}>
            <Image
            style={[ styles.image, imageStyle ]}
            source={source}
            >
            </Image>
            <StateIcon
            state={state}
            ></StateIcon>
    </View>) :
    (<View 
        style={[styles.containerImage,containerStyle]}>
            <TouchableOpacity
            onPress={onPress}
            >
                <Image
                style={[ styles.image, imageStyle ]}
                source={source}
                >
                </Image>
                
            </TouchableOpacity>
    </View>)
}

