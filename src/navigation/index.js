import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Login, Home, Search, Profile, ChatRoom} from '../container'
const Stack = createNativeStackNavigator();
                  
const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index

const styles = StyleSheet.create({})