import { View, Image, StatusBar, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Splashscreen({ navigation }) {

  setTimeout(doSomething, 2500);
  function doSomething() {
    navigation.navigate('Login')
  }
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View className="bg-black flex-1 justify-center items-center">
        {/* <Text className="text-4xl text-white">Shiv Dairy App</Text> */}
        <Image style={{ height: 400, width: 300 }} source={require('../assets/shiv.png')} />
        <ActivityIndicator className="pt-10" color={"red"} size={75} />
      </View>
    </>
  )
}