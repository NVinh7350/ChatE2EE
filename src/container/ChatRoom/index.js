import { StyleSheet, Text, View ,TouchableWithoutFeedback, Keyboard ,Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, FlatList} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { color } from '../../utility';
import FieldInput from '../../component/fieldInput';
import FieldButton from '../../component/fieldButton';
import { useHeaderHeight} from '@react-navigation/elements'
import CircleImage from '../../component/circleImage';
import FieldItem from '../../component/fieldItem';
import MessageCard from '../../component/messageCard';
import { database } from '../../firebase/config';
import { AddMessage } from '../../network/message';
import { getAsyncStorage, keys } from '../../asyncStorage';
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;
let navigations;
let currentUserId;
const Header = ({user}) => {
    return (
        <View style={ styles.containerHeader }>
            <CircleImage
            containerStyle={styles.buttonBack}
            source= {require('../../utility/images/button_back.png')}
            onPress= {()=> navigations.goBack()}
            />
            <FieldItem
            containerStyle={{height: heightScreen * 0.05, width:widthScreen*0.7}}
            containerImageStyle= {{height:'100%',aspectRatio:1 }}
            source= {{uri: user.profileImg}}
            userName= {user.userName}
            textStyle= {styles.textName}
            />
        </View>
  )
}
const Input = ({user}) => {
    let [text, setText] = useState('');

    const handleSend = () => {
        if(text != '')
        {
            AddMessage(user.chatId, currentUserId, new Date().toLocaleString(), text)
            .then(()=>{
                setText('');
            })
        }
    }

    return (
        <View style={ styles.containerTail }>
            <FieldInput
            fieldStyle= {styles.inputMessage}
            placeholder= 'Enter message'
            onChangeText={(e)=> setText(e)}
            value={text}
            />
            <FieldButton
            containerStyle={styles.buttonSend}
            source={require('../../utility/images/icon_send.png')}
            onPress={()=>handleSend()}
            />
        </View>
    )
}
const Body = ({message, user}) => {
    let [listMessage, setListMessage] = useState([]);
    useEffect(()=>{
        
        const onChildAdd = database.ref('messages/'+user.chatId).on('child_added', sn => {
            setListMessage((state)=>[...state, sn.val()])
        })
        
        return () => database.ref('messages/'+user.chatId).off('child_added', onChildAdd);
    }, [user.chatId])
    console.log('length', listMessage.length)
    console.log('currentId', currentUserId)
    console.log('chatId', user.chatId)
    console.log(user.lastChat)
    return (
        <FlatList style={styles.containerBody}
            data={listMessage}
            renderItem={({item})=> 
                listMessage.length > 0 ?(
                <MessageCard
                senderBy={currentUserId === item.sentBy} 
                messageContent={item.messageContent} 
                messageTime={item.messageTime}/>)
                :
                (<></>)
            
            }>
        </FlatList>
        // <></>
    )
}
const ChatRoom = ({route, navigation}) => {
    const headerHeight = useHeaderHeight();
    navigations = navigation;
    const {user} = route.params;
    currentUserId = user.currentUserId;
    let [message, setMessage] = useState('');
    return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={heightScreen * 0.065}
            style={styles.container}
          >
            <Header user={user}/>
            <View style={{height:3, elevation:5}}></View>
            
                <Body message={message} user={user}/>
                <Input user= {user}/>
          </KeyboardAvoidingView>
        
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    containerHeader: {
        height: heightScreen * 0.065,
        width: widthScreen,
        backgroundColor: color.WHITE,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
        
    },
    containerBody: {
        height: heightScreen * 0.756,
        width: widthScreen,
        backgroundColor: color.WHITE,
    },
    containerTail: {
        height: heightScreen * 0.065,
        width: widthScreen,
        backgroundColor: color.WHITE,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
        elevation:0,
    },
    inputMessage: {
        width:widthScreen*0.85,
        marginTop:0,
        marginHorizontal:0,
        elevation:0,
        backgroundColor:color.GRAY_CLOUD,
        borderRadius:20
    },
    buttonSend: {
        width: widthScreen*0.1,
        marginTop:0,
        marginHorizontal:0,
        backgroundColor:color.WHITE,
        elevation: 0

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
    textName: {
        fontSize: 20,
        color: color.BLACK,
        fontWeight: 'bold',
        // alignSelf: 'center',
        
        
    }
})