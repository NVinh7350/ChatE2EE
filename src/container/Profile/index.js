import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import React ,  { useContext }from 'react'
import { color } from '../../utility'
import CircleImage from '../../component/circleImage';
import FieldButton from '../../component/fieldButton';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import { createChat } from '../../network';
import { getAsyncStorage, keys } from '../../asyncStorage';
import { JoinChat } from '../../network/user';
import { checkExistChat, getChatsByUid } from '../../network/chat';
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

let navigations;
const Header = ({source}) => {
    return (
        <View style={ styles.containerHeader }>
            <Image
            style={ styles.backgroundImage}
            source={{ uri: 'https://dohanews.co/wp-content/uploads/2022/05/aww7nqnvmdzd6brsvv2d-1-560x315.jpeg'}}
            ></Image>
            <CircleImage
            containerStyle={styles.buttonBack}
            source= {require('../../utility/images/button_back_w.png')}
            onPress= {()=> navigations.goBack()}
            />
        </View>
  )
}

const Body = ({user}) => {
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;

    const createNewChat = (currentUserId, guestId) =>{
        createChat(currentUserId, guestId)
            .then((res)=> {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                // get chat id from storage
                getAsyncStorage(keys.currentKey)
                .then((currentKey)=>{
                    JoinChat(currentUserId,currentKey);
                    JoinChat(guestId,currentKey);
                    navigations.goBack()
                })
                .catch((error)=>{
                    Alert.alert('handleRegister()', error.message)
                })
            })
            .catch((error)=> {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                Alert.alert('handleRegister()', error.message);})
    }

    const handleMessage = () => {
        // navigations.navigate('ChatRoom', {user});
        dispatchLoaderAction({
            type: LOADING_START,
        });
        // get currentUserId from storage
        getAsyncStorage(keys.uuid)
        .then(currentUserId => {
            getChatsByUid(currentUserId)
            .then((chatIds)=> {
                // check chat room exist
                for (let e in chatIds.val()){
                    if (e === `${currentUserId}-${user.uuid}` || e === `${user.uuid}-${currentUserId}`){
                        return e;
                    }
                }
                return null;
            })
            .then((chatId)=>{
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                // Chat Room is alrealdy
                if(chatId) {
                    var info = {
                        currentUserId: currentUserId,
                        chatId:chatId,
                        userId : user.uuid,
                        userName : user.name,
                        profileImg: user.profileImg,
                        lastChat : '',
                        state: 'Active',
                        seen: false
                    }
                    Alert.alert('Already', user.profileImg);
                    user = info;
                    navigations.navigate('ChatRoom',{user})
                }
                else{
                    createNewChat(currentUserId, user.uuid)
                }
            })
            .catch((e)=>{console.log(e+"jk")})
        }).catch((error)=>{
            dispatchLoaderAction({
                type: LOADING_STOP,
            });
            Alert.alert('handleRegister()', error.message);
        })
    }
    return (
        <View style={ styles.containerBody }>
            <CircleImage
            containerStyle={ styles.containerAvatar }
            source={{ uri: user.profileImg}}
            />
            <Text
            style= { styles.textName }
            >{user.name}</Text>
            <View 
            style= { styles.containerButton }>
                <FieldButton
                containerStyle={ styles.buttonMessage }
                title= {'Message'}
                textStyle={styles.textButtonMessage}
                source= {require('../../utility/images/icon_message.png')}
                onPress= {()=> handleMessage()}
                />
                <FieldButton
                containerStyle={ styles.buttonAddFriend }
                title= {''}
                source= {require('../../utility/images/icon_add_friend.png')}
                />
            </View>
            <Text 
                style={ styles.textTitle }>
                User information </Text>
            <Text 
            style={ styles.textContent }>
            Phone: *********** </Text>
            <Text 
            style={ styles.textContent }>
            Email: {user.email} </Text>
            <Text 
            style={ styles.textContent }>
            Date of birth :	24 / 06/ 1987 </Text>
        </View>
    )
}
export default function Profile({route, navigation}) {
    const {user} = route.params;
    navigations= navigation;
    return (
        <View>
            <Header/>
            <Body user={user}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        height: heightScreen * 0.25,
        width: widthScreen,
        backgroundColor: color.BLUE_DARK,
        justifyContent: 'center'
    },
    buttonBack:{
        height: heightScreen*0.035,
        position: 'absolute',
        left:widthScreen*0.02,
        top:heightScreen*0.015,
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    },
    containerBody: {
        height: heightScreen * 0.75,
        width: widthScreen,
        borderTopColor: color.GRAY_DARK,
        borderTopWidth:3
    },
    containerAvatar: {
        height: heightScreen * 0.2,
        aspectRatio: 1,
        borderColor:color.WHITE,
        borderWidth: 5,
        position: 'absolute',
        top:-heightScreen*0.1,
        alignSelf: 'center'
    },
    textName: {
        fontSize: 25,
        color: color.BLACK,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: heightScreen*0.11,
    },
    containerButton: {
        width: widthScreen * 0.85,
        height: heightScreen * 0.05,
        marginTop: heightScreen*0.05,
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'space-between'
    },
    buttonMessage: {
        width: widthScreen * 0.65,
        height: heightScreen * 0.05,
        marginTop: 0,
        backgroundColor: color.BLUE_BLAND,
        marginLeft: 0,
    },
    textButtonMessage:{
        marginLeft:heightScreen * 0.01,
        color:color.BLUE_DARK
    } ,
    buttonAddFriend: {
        width: widthScreen * 0.15,
        height: heightScreen * 0.05,
        marginTop: 0,
        backgroundColor: color.WHITE,
        marginLeft: 0
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.075,
        color: color.BLACK,
    },
    textContent: {
        fontSize: 16,
        marginTop: heightScreen * 0.025,
        marginHorizontal: widthScreen * 0.125,
        color: color.BLACK,
    },
    
})