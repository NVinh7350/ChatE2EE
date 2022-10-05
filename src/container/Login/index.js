import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
// import color from 'C:/Learn/ChatE2EE/src/utility/index.js'
let navigations = null;
import {color} from 'c:/Learn/ChatE2EE/src/utility'
import FieldInput from '../../component/fieldInput';
import FieldButton from '../../component/fieldButton';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import { RegisterRequest, AddUser, LoginRequest, LogOutRequest } from '../../network';
import { setAsyncStorage, keys, clearAsyncStorage } from "../../asyncStorage";
import {setUniqueValue} from "../../utility/constants"
import auth from '@react-native-firebase/auth';
import firebase from '../../firebase/config'
import md5 from 'md5';
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
        email: 'dev2@gmail.com',
        password: '123456',
    })
    
    const handleLogin = () => {
        if(dataLogin.email && dataLogin.password) {
            dispatchLoaderAction({
                type: LOADING_START,
            });
            LoginRequest(dataLogin.email , dataLogin.password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        dispatchLoaderAction({
                          type: LOADING_STOP,
                        });
                        alert(res);
                        return;
                    }
                    setAsyncStorage(keys.uuid, res.user.uid);
                    setUniqueValue(res.user.uid);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    console.log(dataLogin.password)
                    navigations.navigate("Home");
                })
                .catch((error) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                        Alert.alert('handleLogin()',error.message )
                    });
        }
        else {
            
            Alert.alert('handleLogin() ERROR', JSON.stringify(dataLogin));
        }
    }
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
                placeholder= 'E-mail '
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('password', md5(newWord)) }
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
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;

    let [dataRegister, setDataRegister] = useState({
        userName: 'dev4',
        email: 'dev4@gmail.com',
        password: '123456',
        rePassword: '123456',
    })
    const entryData = (key, value) => {
        setDataRegister({
            ...dataRegister, 
            [key] : value,
        })
    }
    
    const handleRegister = () => {
        if(dataRegister.email && dataRegister.password &&
            dataRegister.userName && (dataRegister.rePassword === dataRegister.password) ) {
            // Alert.alert('handleLogin() SUCCESS', JSON.stringify(dataRegister));
            dispatchLoaderAction({
                type: LOADING_START,
            });
            RegisterRequest(dataRegister.email, dataRegister.password)
            .then((res)=> {
                if (!res.additionalUserInfo) {
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
                    alert(res);
                    return;
                }
                console.log('RegisterRequest 163',dataRegister.email+ dataRegister.password)
                let uid = auth().currentUser.uid;
                console.log(uid)
                let profileImg = "";
                console.log('RegisterRequest 166')
                AddUser(dataRegister.userName, dataRegister.email, uid, profileImg)
                    .then(() => {
                        console.log('RegisterRequest 168')
                        setAsyncStorage(keys.uuid, uid);
                        setUniqueValue(uid);
                        console.log('RegisterRequest 171')
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                        // navigations.navigate("Home");
                        // setScreen(SCREEN_LOGIN);
                        console.log('AddUser(dataRegister.userName, dataRegister.email, uid, profileImg)', dataRegister.password);
                    })
                    .catch((error) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    Alert.alert('handleRegister()182', error.message);
                    });
                })
            .catch((error)=> {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                Alert.alert('handleRegister()', error.message);
            })

        }
        else {
            Alert.alert('handleLogin() ERROR', JSON.stringify(dataRegister));
        }
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
                onChangeText={ (newWord) => entryData('password', md5(newWord)) }
                placeholder= 'Password'
                uriIconTitle={require('../../utility/images/icon_mail.png')}
                buttonIcon={true}
                uriIconOn={require('../../utility/images/icon_eye.png')}
                uriIconOff={require('../../utility/images/icon_eye_slash.png')}
                ></FieldInput>
            <FieldInput
                onChangeText={ (newWord) => entryData('rePassword', md5(newWord)) }
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