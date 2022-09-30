import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import React, { useState } from 'react'
import Colors from '../colors/colors'
let navigations = null;
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
        colorLogin = Colors.blueDark;
        colorRegister = Colors.grayDark;
    }
    else {
        colorLogin = Colors.grayDark;
        colorRegister = Colors.blueDark;
    }
    return (
        <View style={ styles.containerBody }>
            <View style={ styles.containerButtonTap }>
                <TouchableOpacity style={ [styles.buttonTap, {borderBottomColor: colorLogin}] }
                    onPress={ () => setScreen(SCREEN_LOGIN) }>

                    <Text style={ [styles.textTitleSmall, {color: colorLogin}] }> Sign In </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ [styles.buttonTap, {borderBottomColor: colorRegister}] }
                    onPress={ () => setScreen(SCREEN_REGISTER) }>
                        
                    <Text style={ [styles.textTitleSmall, {color: colorRegister}] }> Sign Up</Text>
                </TouchableOpacity>
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
    let [eye, setEye] = useState(false);
    return (
        <View>
            <Text style={ styles.textTitle }>Login in your account </Text>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_mail.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setEmail(newWord)}
                    placeholder= 'E-mail'
                ></TextInput>
            </View>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_lock.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setPassword(newWord)}
                    placeholder= 'Password'
                    secureTextEntry= {!eye}
                ></TextInput>
                <TouchableOpacity style= {styles.icon}
                    onPress= {() => setEye(!eye)}
                >
                    <Image style={ {height: '100%', width: '100%'} }
                        source={ eye ? require('../images/icon_eye.png') : require('../images/icon_eye_slash.png') }
                    ></Image>
                </TouchableOpacity>
            </View>
            <Text style={ styles.textFogetPassword }
                onPress={ ()=> {}}
            >Foget password? </Text>
            <TouchableOpacity style={ styles.buttonHanlde }
                onPress={ () => {navigations.navigate('ListChatRoom')}}
            >
                <Text style={ styles.textTitleSmall}> Login </Text>
            </TouchableOpacity>
        </View>
    )
}

const RegisterScreen = () => {
    let [userName, setUserName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [rePassword, setRePassword] = useState('');
    let [eye, setEye] = useState(false);
    return (
        <View>
            <Text style={ styles.textTitle }>Login in your account </Text>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_person.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setUserName(newWord)}
                    placeholder= 'User Name'
                ></TextInput>
            </View>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_mail.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setEmail(newWord)}
                    placeholder= 'E-mail'
                ></TextInput>
            </View>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_lock.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setPassword(newWord)}
                    placeholder= 'Password'
                    secureTextEntry= {!eye}
                ></TextInput>
                <TouchableOpacity style= {styles.icon}
                    onPress= {() => setEye(!eye)}
                >
                    <Image style={ {height: '100%', width: '100%'} }
                        source={ eye ? require('../images/icon_eye.png') : require('../images/icon_eye_slash.png') }
                    ></Image>
                </TouchableOpacity>
            </View>
            <View style={ styles.boxDataEntry }>
                <Image style={ styles.icon }
                    source={ require('../images/icon_lock.png')}
                ></Image>
                <TextInput style={ styles.textDataEntry}
                    onChangeText= {(newWord) => setRePassword(newWord)}
                    placeholder= 'Repeat Password'
                    secureTextEntry= {!eye}
                ></TextInput>
            </View>
            <TouchableOpacity style={ styles.buttonHanlde }
                onPress={ () => {}}
            >
                <Text style={ styles.textTitleSmall}> Login </Text>
            </TouchableOpacity>
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
    container : {
        height: heightScreen,
        width: widthScreen,
    },
    containerHeader: {
        height: heightScreen * 0.2,
        width: widthScreen,
        backgroundColor: Colors.blueDark,
        justifyContent: 'center'
    },
    textTitleSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.white,
        
    },
    textTitleBig: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.white,
    },
    containerBody : {
        height: heightScreen * 0.8,
        width: widthScreen,
    },
    containerButtonTap: {
        height: heightScreen * 0.055,
        width: widthScreen,
        flexDirection: 'row'
    },
    buttonTap: {
        width: widthScreen * 0.5,
        borderBottomWidth: 3,
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.05,
        color: Colors.black,
    },
    boxDataEntry: {
        height: heightScreen * 0.05,
        marginHorizontal: widthScreen * 0.05,
        marginTop: heightScreen * 0.025,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: '5%',
        height: '45%',
        width: '5%'
    },
    textDataEntry: {
        height: '100%',
        width: '70%',
        fontSize: 16,
        fontFamily: 'sans-serif-medium'
    },
    textFogetPassword: {
        fontSize: 16,
        alignSelf: 'flex-end',
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.05,
        color: Colors.black,
    },
    buttonHanlde: {
        height: heightScreen * 0.05,
        marginHorizontal: widthScreen * 0.05,
        marginTop: heightScreen * 0.025,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: Colors.blueDark,
        justifyContent: 'center',
        alignItems: 'center'
    }

})