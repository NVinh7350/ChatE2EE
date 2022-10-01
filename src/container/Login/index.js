import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import React, { useState } from 'react'
// import color from 'C:/Learn/ChatE2EE/src/utility/index.js'
let navigations = null;
import {color} from 'c:/Learn/ChatE2EE/src/utility'
import FieldInput from '../../component/fieldInput';
import FieldButton from '../../component/fieldButton';
//
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;
//
const SCREEN_LOGIN = 'SCREEN_LOGIN';
const SCREEN_REGISTER= 'SCREEN_REGISTER';
let   colorLogin = '';
let   colorRegister = '';

const Header = () => {
    return (
        <View style={ styles.containerHeader }>
            <Text style= { styles.textTitleBig }> E2EE </Text>
            <Text style= { styles.textTitleSmall}> Chat sercurity</Text>
        </View>
  )
}

const Body = () => {
    let [screen, setScreen] = useState(SCREEN_LOGIN);
    if (screen === SCREEN_LOGIN){
        colorLogin = color.BLUE_DARK;
        colorRegister = color.GRAY_DARK;
    }
    else {
        colorLogin = color.GRAY_DARK;
        colorRegister = color.BLUE_DARK;
    }
    return (
        <View style={ styles.containerBody }>
            <View style={ styles.containerButtonTap }>
                <FieldButton
                    containerStyle={[styles.buttonTap, {borderBottomColor: colorLogin}]}
                    onPress={ () => setScreen(SCREEN_LOGIN) }
                    textStyle={ [styles.textTitleSmall, {color: colorLogin}] }
                    title= 'Sign In'
                />
                <FieldButton
                    containerStyle={[styles.buttonTap, {borderBottomColor: colorRegister}]}
                    onPress={ () => setScreen(SCREEN_REGISTER) }
                    textStyle={ [styles.textTitleSmall, {color: colorRegister}] }
                    title= 'Sign Up'
                />
            </View>
            {
                screen === SCREEN_LOGIN ?
                <LoginScreen/> :
                <RegisterScreen/>
            }
        </View>
    )
}

const LoginScreen = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    return (
        <View>
            <Text style={ styles.textTitle }>Login in your account </Text>
            <FieldInput
            // fieldStyle={{flexDirection: 'row-reverse'}}
            // inputStyle={{width: widthScreen * 0.73 ,}}
            onChangeText= {(newWord) => setEmail(newWord)}
            placeholder= 'E-mail'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_mail.png')}
            />
            <FieldInput
            onChangeText= {(newWord) => setPassword(newWord)}
            placeholder= 'Password'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_mail.png')}
            buttonIcon={true}
            uriIconOn={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye.png')}
            uriIconOff={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye_slash.png')}
            />
            <Text style={ styles.textFogetPassword }
                onPress={ ()=> {}}
            >Foget password? </Text>

            <FieldButton
            title={'Login'}
            onPress={ () => {navigations.navigate('Home')}}
            />

        </View>
    )
}

const RegisterScreen = () => {
    let [userName, setUserName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [rePassword, setRePassword] = useState('');
    return (
        <View>
            <Text style={ styles.textTitle }>Login in your account </Text>
            <FieldInput
            onChangeText= {(newWord) => setUserName(newWord)}
            placeholder= 'User Name'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_person.png')}
            />
            <FieldInput
            onChangeText= {(newWord) => setEmail(newWord)}
            placeholder= 'E-mail'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_mail.png')}
            />
            <FieldInput
            onChangeText= {(newWord) => setPassword(newWord)}
            placeholder= 'Password'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_mail.png')}
            buttonIcon={true}
            uriIconOn={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye.png')}
            uriIconOff={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye_slash.png')}
            />
            <FieldInput
            onChangeText= {(newWord) => setRePassword(newWord)}
            placeholder= 'Repeat Password'
            uriIconTitle={require('C:/Learn/ChatE2EE/src/utility/images/icon_mail.png')}
            buttonIcon={true}
            uriIconOn={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye.png')}
            uriIconOff={require('C:/Learn/ChatE2EE/src/utility/images/icon_eye_slash.png')}
            />
            <FieldButton
            title={'Register'}
            onPress={ () => {navigations.navigate('Home')}}
            />
        </View>
    )
}

const Login = ({navigation}) => {
    navigations= navigation;
  return (
    <View style={ styles.container }>
        <Header/>
        <Body/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

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
    },

    containerButtonTap: {
        height: heightScreen * 0.055,
        width: widthScreen,
        flexDirection: 'row'
    },
    buttonTap: {
        height: heightScreen * 0.055,
        width: widthScreen * 0.5,
        borderBottomWidth: 3,
        justifyContent: 'center',
        marginHorizontal: 0,
        marginTop: 0,
        borderRadius: 0,
        elevation: 0,
        backgroundColor: color.WHITE
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.05,
        color: color.BLACK,
    },
    textFogetPassword: {
        fontSize: 16,
        alignSelf: 'flex-end',
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.05,
        color: color.BLACK,
    },

})