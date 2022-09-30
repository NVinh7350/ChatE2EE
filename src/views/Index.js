import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import ListRoom from './ListRoom';
import ListChatRoom from './ListChatRoom';
const Stack = createNativeStackNavigator();
                  
const Index = () => {
    console.log('Index')
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListRoom' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="ListRoom" component={ListRoom}  />
        <Stack.Screen name="RoomChat" component={ListRoom}  />
        <Stack.Screen name="ListChatRoom" component={ListChatRoom}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index

const styles = StyleSheet.create({})