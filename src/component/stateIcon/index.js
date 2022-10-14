import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { color } from '../../utility';
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;
export default stateIcon = ({
    state
}) => {
    if ( state != 'Active' && state != 'Sleep' && state)
    return (
        <View style= {styles.imageStateSlepp}>
            <Text style={{fontSize:7, color:'black'}}>{`  ${state}  `}</Text>
        </View>
    )
    switch(state) {
        case 'Active': 
            return <View style= { styles.imageStateAtive }></View>
        case 'Sleep':
            return <View></View>
        default:
            return <View></View>
    }
}

const styles = StyleSheet.create({
    imageStateAtive: {
        height: heightScreen * 0.023,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 3,
        borderColor:'white',
        backgroundColor: color.GREEN_DARK,
        position:'absolute',
        top: heightScreen * 0.055,
        left: heightScreen *0.055
    },
    imageStateSlepp: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor:'white',
        backgroundColor: color.ORANGE,
        position:'absolute',
        top: heightScreen * 0.055,
        left: heightScreen *0.05
    }
})