import { StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import FieldInput from '../../component/fieldInput'
import { auth, database } from '../../firebase/config';
import FieldItem from '../../component/fieldItem';
import { color } from '../../utility';
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

let navigations;
const ItemListSearch = ({user}) => {
    return (
        <FieldItem
        userName={user.name}
        state={'Sleep'}
        lastMessage={user.email}
        timeMessage={''}
        seen= {true}
        source={{uri: user.profileImg}}
        onPress= {()=> navigations.navigate('Profile', {user})}
        />
    )
}
const ListSearch = ({listUser}) => {
    return (
        <View>
            <FlatList
                style={ styles.listSearch }
                renderItem= {({item})=>{return <ItemListSearch user={item}/>}}
                data= {listUser}
                showsVerticalScrollIndicator= {true}
                showsHorizontalScrollIndicator= {true}
            ></FlatList>
        </View>
    )
}
const Search = ({navigation}) => {
    navigations = navigation;
    let listSearch = [];
    let [listUser, setListUser] = useState([]);
    let [email, setEmail] = useState('');
    // console.log(email)
    useEffect(()=>{
        if(email.length) {
            new Promise((resolve, reject) => {
                resolve(database.ref('users/').once('value', snapshot => {
                    listSearch = [];
                    snapshot.forEach(chil => {
                        if((chil.val().email).match(new RegExp(email,'g')))
                            listSearch.push(chil.val());
                    })
                }))
                reject('error')
            })
            .then(()=>{
                setListUser(listSearch);
            })
            .catch((error)=>console.log(error));
            
        } else {
            setListUser([]);
        }
    }, [email])
    
    return (
    <View>
        <FieldInput
        fieldStyle={styles.searchInput}
        onChangeText={(e)=>{setEmail(e)}}
        placeholder='Search'
        inputStyle={{marginLeft: widthScreen * 0.12}}
        ></FieldInput>
        <CircleImage
            containerStyle={styles.buttonBack}
            source= {require('../../utility/images/button_back.png')}
            onPress= {()=> navigation.goBack()}
        />
        <View style= {{ height:1, backgroundColor:color.GRAY_DARK}}></View>
        <ListSearch
        listUser={listUser}
        ></ListSearch>
    </View>
    
  )
}

export default Search

const styles = StyleSheet.create({

    buttonBack:{
        height: heightScreen*0.035,
        position: 'absolute',
        left:widthScreen*0.08,
        top:heightScreen*0.033 
    },
    searchInput: {
        marginVertical: heightScreen * 0.025,
        borderRadius: 5,
        flexDirection:'row',
        elevation: 3,
        alignItems: 'center',
    },
    listSearch: {
        paddingHorizontal: widthScreen * 0.02,
        paddingTop: heightScreen * 0.02
    }

})