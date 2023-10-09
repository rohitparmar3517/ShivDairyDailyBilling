import { View, Image, StatusBar, ActivityIndicator, Vibration } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function Splashscreen({ navigation }) {

  setTimeout(doSomething, 2500);
  async function doSomething() {
    Vibration.vibrate(1)
    const result = await AsyncStorage.getItem('login');
    if (result == 'true') {

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      });
      Toast.show({
        type: 'success',
        text1: 'Login Success',
      });
    }
    else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
    }

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