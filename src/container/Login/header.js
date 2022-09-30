import {Dimensions ,View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {color} from '../../utility'
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default Header = () => {
    return (
        <View style={ styles.containerHeader }>
            <Text style= { styles.textTitleBig }> E2EE </Text>
            <Text style= { styles.textTitleSmall}> Chat sercurity</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container : {
        height: heightScreen,
        width: widthScreen,
    },
    containerHeader: {
        height: heightScreen * 0.2,
        width: widthScreen,
        backgroundColor: color.BLUE_DARK,
        justifyContent: 'center'
    },
    textTitleSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.WHITE,
        
    },
    textTitleBig: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.WHITE,
    },})