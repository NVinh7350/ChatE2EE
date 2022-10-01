import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import Index from './src/navigation/index'
import Loader from './src/component/loader'
import { StoreProvider } from './src/context/store'
const App = () => {
  return (
    <StoreProvider>
        <Index/>
        <Loader/>
    </StoreProvider>
  )
}

export default App

const styles = StyleSheet.create({})