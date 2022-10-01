import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
// import color from 'C:/Learn/ChatE2EE/src/utility/index.js'
let navigations = null;
import {color} from 'c:/Learn/ChatE2EE/src/utility'
import FieldInput from '../../component/fieldInput';
import FieldButton from '../../component/fieldButton';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
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
                    ></FieldButton>
                <FieldButton
                    containerStyle={[styles.buttonTap, {borderBottomColor: colorRegister}]}
                    onPress={ () => setScreen(SCREEN_REGISTER) }
                    textStyle={ [styles.textTitleSmall, {color: colorRegister}] }
                    title= 'Sign Up'
                    ></FieldButton>
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
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;

    let [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    })
    const handleLogin = () => {
        if(dataLogin.email && dataLogin.password) {
            Alert.alert('handleLogin() SUCCESS', JSON.stringify(dataLogin));
            dispatchLoaderAction({
                type: LOADING_START,
            });
            setTimeout(()=>{
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
            }, 2000);
        }
        else {
            
            Alert.alert('handleLogin() ERROR', JSON.stringify(dataLogin));
        }
    }
   console.log(JSON.stringify(dataLogin))
    const entryData = (key, value) => {
        setDataLogin({
            ...dataLogin, 
            [key] : value,
        })
    }

    return (
        <View>
            <Text 
                style={ styles.textTitle }>
                Login in your account </Text>
            <FieldInput
                // fieldStyle={{flexDirection: 'row-reverse'}}
                // inputStyle={{width: widthScreen * 0.73 ,}}
                onChangeText={ (newWord) => entryData('email', newWord) }
                placeholder= 'E-mail'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('password', newWord) }
                placeholder= 'Password'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                buttonIcon={true}
                uriIconOn={require('../../utility/images/icon_eye.png')}
                uriIconOff={require('../../utility/images/icon_eye_slash.png')}
                ></FieldInput>
            <Text 
                style={ styles.textFogetPassword }
                onPress={ ()=> {}}
                >Foget password? </Text>

            <FieldButton
                title={'Login'}
                // onPress={ () => {navigations.navigate('Home')}}
                onPress={ () => handleLogin()}
                ></FieldButton>

        </View>
    )
}

const RegisterScreen = () => {
    let [dataRegister, setDataRegister] = useState({
        userName: '',
        email: '',
        password: '',
        rePassword: '',
    })
    const handleRegister = () => {
        if(dataRegister.email && dataRegister.password &&
            dataRegister.userName && (dataRegister.rePassword === dataRegister.password) ) {
            Alert.alert('handleLogin() SUCCESS', JSON.stringify(dataRegister));
        }
        else {
            Alert.alert('handleLogin() ERROR', JSON.stringify(dataRegister));
        }
    }
   console.log(JSON.stringify(dataRegister))
    const entryData = (key, value) => {
        setDataRegister({
            ...dataRegister, 
            [key] : value,
        })
    }
    return (
        <View>
            <Text style={ styles.textTitle }>Login in your account </Text>
            <FieldInput
                onChangeText={ (newWord) => entryData('userName', newWord) }
                placeholder= 'User Name'
                uriIconTitle={require('../../utility/images/icon_person.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('email', newWord) }
                placeholder= 'E-mail'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('password', newWord) }
                placeholder= 'Password'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                buttonIcon={true}
                uriIconOn={require('../../utility/images/icon_eye.png')}
                uriIconOff={require('../../utility/images/icon_eye_slash.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('rePassword', newWord) }
                placeholder= 'Repeat Password'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                buttonIcon={true}
                uriIconOn={require('../../utility/images/icon_eye.png')}
                uriIconOff={require('../../utility/images/icon_eye_slash.png')}
                ></FieldInput>
            <FieldButton
                title={'Register'}
                // onPress={ () => {navigations.navigate('Home')}}
                onPress={ () => {handleRegister()}}
                ></FieldButton>
        </View>
    )
}

const Login = ({navigation}) => {
    navigations= navigation;
  return (
    <View>
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