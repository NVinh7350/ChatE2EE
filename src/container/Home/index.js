import { FlatList, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { LogOutRequest } from '../../network';
import { clearAsyncStorage } from '../../asyncStorage';
import { color } from '../../utility';
import { database } from '../../firebase/config'
import CircleImage from '../../component/circleImage';
import FieldItem from '../../component/fieldItem';
import FieldInput from '../../component/fieldInput';
import { getChatsByUid, getUserByChatId } from '../../network/chat';
import { getUserById } from '../../network/user';
let navigations;
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;
const Active = 'Active';
const Sleep = 'Sleep';

// Color
const Green = '#037136';
const GreenActive = '#25CE09';
const GreenSleep = '#A1F999';
// Colertion


const fixText = (name) => {
    return name.length > 24 ? name.slice(0,20).concat('...') : name
}

const handleLogout = () => {
    Alert.alert('Logout', 'are you sure?',[
        {
            text: 'Yes',
            onPress: (()=>{
                LogOutRequest()
                .then(()=>{
                    clearAsyncStorage()
                    .then(()=>{
                        navigations.navigate('Login');
                    })
                })
                .catch((error)=>{
                    alert(error.message);
                })
            })
        },
        {
            text: 'No',
        },
        
    ],
    )
}

const HeaderComponent = () =>{
    let [search, setSearch] = useState('');
    return (
        <View style={ styles.header }>
            <FieldInput
            fieldStyle={styles.searchInput}
            uriIconTitle={ require('C:/Learn/ChatE2EE/src/utility/images/icon_magnifying_glass.png') }
            onFocus={()=> {navigations.navigate('Search')}}
            placeholder=' Search '
            />
            <View style={ styles.containerTitle }>
                <CircleImage
                    containerStyle={styles.imageFrameSmall}
                    source= {{uri:'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/258382205_1087261675423344_3439049621487177253_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=z-XUbf02CHQAX_ywK_c&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_5jccyS9ulEC6TeXNp_nbVB3vhHDb3yMy8qOjgSJdQ3g&oe=632A0D26'}}
                    onPress= {()=>{}}
                />
                <Text style={ styles.title}>   Chatst</Text>
                <CircleImage
                    containerStyle={{marginLeft:widthScreen*0.4, height: heightScreen*0.035}}
                    source= {require('../../utility/images/button_off.png')}
                    onPress= {()=> handleLogout()}
                />
                
            </View>
        </View>
    )
}

const itemChatRoom = ({item}) => {
    let user = item;
    return (
        <FieldItem
        userName={item.userName}
        state={item.state}
        lastMessage={item.lastChat}
        seen= {item.seen}
        source={{uri: item.profileImg}}
        onPress= {()=> {navigations.navigate('ChatRoom',{user})}}
        />
    )
}
const ListRoomChat = ({listRoom}) => {
    return (
        <View>
            <FlatList
                style={ styles.listChatRoom }
                renderItem= {itemChatRoom}
                data= {listRoom}
                showsVerticalScrollIndicator= {false}
                showsHorizontalScrollIndicator= {false}
            ></FlatList>
        </View>
    )
}

const Home = ({route, navigation}) => {
    navigations = navigation;
    let [listRoom, setListRoom] = useState([]);
    let [chatIds, setChatIds] = useState([]);
    let listUser = [];
    const {uid} = route.params;
    
    useEffect(()=>{
        getChatsByUid(uid)
        .then((chatIds)=>{
            getUserByChatId(Object.keys(chatIds.val()))
            .then((uids)=> {
                getUserById(uids.filter((e)=> e!== uid))
                .then(x => {
                    x.map((e, i)=>{
                        console.log(Object.keys(chatIds.val())[i])
                        listUser.push({
                        currentUserId: uid,
                        chatId:Object.keys(chatIds.val())[i],
                        userId : e.uuid,
                        userName : e.name,
                        profileImg: e.profileImg,
                        lastChat : i,
                        state: Active,
                        seen: false
                    })})
                })
                .then(()=>{
                    setListRoom([...listUser])
                })
            })
            
        })
    }, [])
  return (
    <View>
        <HeaderComponent/>
            {/* <ListFavorite/> */}
            <ListRoomChat listRoom={listRoom}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    header: {
        height: heightScreen * 0.19,
        width: widthScreen,
        flexDirection: 'column-reverse',
        backgroundColor: color.BLUE_DARK,
        paddingHorizontal: widthScreen* 0.04,
        paddingVertical: heightScreen* 0.02,
    },
    searchInput: {
        height: heightScreen * 0.06,
        width: widthScreen* 0.92,
        marginVertical: widthScreen * 0.005,
        borderRadius: 5,
        flexDirection:'row',
        elevation: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal:0
    },
    icon: {
        marginHorizontal: '5%',
        height: '40%',
        width: '5%'
    },
    textInput: {
        height: '100%',
        width: '70%',
        fontSize: 16,
        fontFamily: 'sans-serif-medium'
    },
    containerTitle: {
        height: heightScreen * 0.08,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    },
    imageFrameSmall: {
        height: heightScreen * 0.06,
        aspectRatio: 1,
        borderRadius: 100,
    },
    imageCircle: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100
    },
    listFavorite: {
        height: heightScreen * 0.15,
        width: widthScreen,

    },
    itemFavorite: {
        height: heightScreen * 0.15,
        width: widthScreen * 0.23,
        alignItems: 'center',
        paddingVertical: heightScreen * 0.01
    },
    imageFrameLarge: {
        height: heightScreen * 0.075,
        aspectRatio: 1,
        borderRadius: 100,
    },
    test: {
        height: heightScreen * 0.075,
        borderWidth:1,
        width: widthScreen *0.2
    },
    textMedium: {
        width:widthScreen*0.2,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        marginTop: heightScreen*0.01,
        color: 'black'
    },
    listChatRoom: {
        height: heightScreen*0.77,
        width:'100%',
        paddingHorizontal:widthScreen *0.01,
    },
    itemChatRoom: {
        height: heightScreen * 0.1,
        width: '100%' ,
        flexDirection: 'row',
        paddingHorizontal: widthScreen*0.02
    },
    textArea: {
        height: '100%',
        width: '100%',
        marginHorizontal: widthScreen*0.04,
        justifyContent:'center',
        paddingVertical: heightScreen*0.025
    },
    textLarge : {
        fontSize: 17,
        color: 'black'
    },
    imageStateAtive: {
        height: heightScreen * 0.023,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 3,
        borderColor:'white',
        backgroundColor: GreenActive,
        position:'absolute',
        top: heightScreen * 0.055,
        left: heightScreen *0.065
    },
    imageStateSlepp: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor:'white',
        backgroundColor: GreenSleep,
        position:'absolute',
        top: heightScreen * 0.055,
        left: heightScreen *0.055
    }
})