import { FlatList, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { LogOutRequest } from '../../network';
import { clearAsyncStorage } from '../../asyncStorage';
import { color } from '../../utility';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import firebase from '../../firebase/config'
import db from '@react-native-firebase/database'
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
const obj = {
    userName: 'Favorite',
    uri: require('C:/Learn/ChatE2EE/src/utility/images/image_heart.png'),
    lastChat: 'See you next week',
    state : Sleep,
    seen : false
};
const listRoom = [
    {
        userName: 'Leo Messi',
        uri: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-1/199385759_345470910277839_3988273979229903886_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=1BD2DzYTASEAX8btq3D&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT9eL-g97GMC9Ztx9JF3J3C330H00CaRjv7ughf8YViurA&oe=63484105',
        lastChat: 'See you next week',
        state : Active,
        seen : false
    },
    {
        userName: 'Ngọc Thịnh',
        uri: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/305036436_3358813564359990_3446424542377979798_n.jpg?stp=c0.0.564.564a_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=7neoxB3wQH0AX-9gFmj&tn=knGt1C58jKbYslYB&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT8F7yql7kx8dLkIFZpIqiigqvJpmd18oLDZjSgUfsK6BA&oe=632957E5',
        lastChat: 'See you next week',
        state : Active,
        seen : false
    },
    {
        userName: 'Nguyễn Mạnh Đức ',
        uri: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/300428018_3175191066129873_2867134887929497865_n.jpg?stp=c0.107.320.320a_dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mEYACkr7nh0AX_4Iwak&_nc_ht=scontent.fsgn2-8.fna&oh=00_AT_zB7pMiov1kAD0TT6nhyD__yLg7KI-6PlENcVWld3fmA&oe=6329491D',
        lastChat: 'Have you eaten',
        state : '2 giờ',
        seen : true
    },
    {
        userName: 'Đặng Thị Phú',
        uri: 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/277678228_108745871804600_5850820092200084911_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=x2ztYYkN6VsAX_RGwSr&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT-dLwrlEFFfWX78aIrfkRpJyT0EJogl0YjPaGO7r-4L1g&oe=63299BDB',
        lastChat: 'See you next week',
        state : '22 phút',
        seen : true
    },
    {
        userName: 'Quangg Nguyễn',
        uri: 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-1/116709544_1224422404567280_7032732816317583889_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=F-nP2P3taQAAX9s-ijD&_nc_oc=AQmqWYbAhDUVawo-mMfBxzFBzg0mfwukfftYv-T8NJHOQTYge8KidqvWSNT_48zdCLDN64eFO3o0SF4TER72JNzT&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT8OU73nMLISnAJnZr1REANCI8mabSckkntvGgj5rpzbpA&oe=63488F1E',
        lastChat: 'See you next week',
        state : Active,
        seen : false
    },
    {
        userName: 'Lê Trần Ngân Hà ',
        uri: 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-1/298217524_764209131569253_1855968198168881101_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=p3gNUbGrydgAX-npqzw&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT_T8Q7HkuS-0E74gLxpKwdxw4IcelUHb0QzdJ32LaXWkA&oe=63283946',
        lastChat: 'Have you eaten',
        state : '12 phút',
        seen : true
    },
    {
        userName: 'Đỗ Sanh',
        uri: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/276301580_1938218739684189_2240312544579214774_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=43NBTO6PMVoAX9tog5L&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_5eePeCGP1T51yShZlmA-Njb3_0FF7wcgJtzsYO17_Mw&oe=632A185F',
        lastChat: 'See you next week',
        state : Active,
        seen : false
    }
]


const fixText = (name) => {
    return name.length > 24 ? name.slice(0,20).concat('...') : name
}

const handleLogout = () => {
    // Alert.alert('Logout', 'are you sure?',[
    //     {
    //         text: 'Yes',
    //         onPress: (()=>{
    //             LogOutRequest()
    //             .then(()=>{
    //                 clearAsyncStorage()
    //                 .then(()=>{
    //                     navigations.navigate('Login');
    //                 })
    //             })
    //             .catch((error)=>{
    //                 alert(error.message);
    //             })
    //         })
    //     },
    //     {
    //         text: 'No',
    //     },
        
    // ],
    // const a = async() => {
    //     await firebase.database('https://chate2ee-default-rtdb.firebaseio.com').ref('user');
    // }
    // )
    Alert.alert('', db(firebase).app.database().ref('user/'));
    // db(firebase).ref('user/').on('value', sn => alert('','value'+sn));
}

const HeaderComponent = () =>{
    let [search, setSearch] = useState('');
    // Alert.alert('mess', firebase.options.databaseURL);
    return (
        <View style={ styles.header }>
            <View style={ styles.searchInput }>
                <Image 
                    style={ styles.icon }
                    source={ require('C:/Learn/ChatE2EE/src/utility/images/icon_magnifying_glass.png') }
                ></Image>
                <TextInput
                    style={ styles.textInput }   
                    placeholder=' Search '
                    onChangeText={ (newWord) => {setSearch(newWord)} }
                ></TextInput>
            </View>
            <View style={ styles.containerTitle }>
                <TouchableOpacity
                    style={ styles.imageFrameSmall }
                >
                    <Image 
                        style= {styles.imageCircle}
                        source= {{uri:'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/258382205_1087261675423344_3439049621487177253_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=z-XUbf02CHQAX_ywK_c&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_5jccyS9ulEC6TeXNp_nbVB3vhHDb3yMy8qOjgSJdQ3g&oe=632A0D26'}}
                    ></Image>
                </TouchableOpacity>
                <Text style={ styles.title}>   Chatst</Text>
                <TouchableOpacity
                    style={ [styles.imageFrameSmall, {marginLeft:widthScreen*0.4, height: heightScreen*0.035},] }
                    onPress= {()=> handleLogout()}
                >   
                    <Image 
                        style= {[styles.imageCircle, {}]}
                        source= {require('../../utility/images/button_off.png')}
                    ></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ItemFavorite = ({item}) => {
    // navigation.navigate('RoomChat')
    if (item.userName === 'Favorite') 
    return (
        <View style={ styles.itemFavorite }>
            <TouchableOpacity >
                <Image 
                    style={[ styles.imageFrameLarge, {alignSelf: 'center'} ]}
                    source={ require('C:/Learn/ChatE2EE/src/utility/images/image_heart.png')}>
                </Image>
                <Text style={ styles.textMedium}>
                    {fixText(item.userName)}
                </Text>
            </TouchableOpacity>
        </View>
    )
    else
    return (<View style={ styles.itemFavorite }>
        <TouchableOpacity onPress={ () => {console.log('clickx');navigations.navigate('Login')}}>
            <Image 
                style={[ styles.imageFrameLarge, {alignSelf: 'center'} ]}
                source={{uri: item.uri}}>
            </Image>
            <Text style={ styles.textMedium}>
                {fixText(item.userName)}
            </Text>
        </TouchableOpacity>
        <View style= { [styles.imageStateAtive, {top: heightScreen *0.062, left: heightScreen *0.072}] }></View>
        </View>
    )
}

const ListFavorite = () => {
    return (
        <View>
            <FlatList
                style={ styles.listFavorite }
                // renderItem= {(item) => itemFavorite(item.item,{navigation})}
                renderItem={({item}) => <ItemFavorite item={item} />}
                data= {[obj,...listRoom.filter((e) => e.state === Active)]}
                horizontal= {true}
                showsVerticalScrollIndicator= {false}
                showsHorizontalScrollIndicator= {false}
            ></FlatList>
        </View>
    )
}

const ItemState = ({item}) => {
    switch(item.state) {
        case Active: 
            return <View style= { styles.imageStateAtive }></View>
        case Sleep:
            return <View></View>
        default:
            return (
                <View style= {styles.imageStateSlepp}>
                    <Text style={{fontSize:7, color:'black'}}>{`  ${item.state}  `}</Text>
                </View>)
    }
}

const itemChatRoom = ({item}) => {
    var border = item.seen === true ? 'bold' : 'normal'
    return (
        <View style={ styles.itemChatRoom }>
            <TouchableOpacity style={ styles.containerTitle }
                onPress={ () => {console.log('clickli');navigations.navigate('Login')}}
            >
                <View style={ [styles.imageFrameLarge, {alignSelf:'center'}] }>
                    <Image 
                        style={ styles.imageCircle }
                        source={{uri: item.uri}}>
                    </Image>
                </View>
                
                <View style={ [styles.textArea, {color: 'black'}]}>
                    <Text style={[ styles.textLarge, {fontWeight: border} ]}>
                        {fixText(item.userName)}
                    </Text>
                    
                    <Text style={[ styles.textMedium, {width:'100%', textAlign: 'left', marginTop:0,fontWeight:border} ]}>
                        {item.lastChat}
                    </Text>
                </View>
            </TouchableOpacity>
            <ItemState item = {item}></ItemState>
        </View>
    )
}
const ListRoomChat = () => {
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

const ListChatRoom = ({navigation}) => {
    navigations = navigation;
  return (
    <View>
        <HeaderComponent/>
            <ListFavorite/>
            <ListRoomChat />
    </View>
  )
}

export default ListChatRoom

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
        width: '100%',
        marginVertical: widthScreen * 0.02,
        borderRadius: 5,
        flexDirection:'row',
        elevation: 3,
        backgroundColor: 'white',
        alignItems: 'center'
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
        borderRadius: 100
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
        height: heightScreen*0.67,
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