import { View, Text, StatusBar, TextInput, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [uname, setuname] = useState('');
  const [upassword, setupassword] = useState('');
  const [isLoading, setLoading] = useState(null);
  const password = useRef();

  var onLogin = () => {
    if (upassword != '' && uname != '') {
      setLoading(true)

      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Login Success',

        });
        setLoading(false)
      }, 2500);
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Usarname & Password',
      });
    }
  };
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ScrollView className="bg-white">
        <View className="bg-white flex-1 items-center justify-center gap-10 p-10">
          <Image style={{ height: 400, width: 300 }} source={require('../assets/shiv.png')} />
          <Text className="text-4xl text-red-500 font-extrabold">Login</Text>
          <View className="w-full">
            <View className="border-indigo-500 border-[2px] rounded-xl mb-4">
              <TextInput onSubmitEditing={() => {
                password.current.focus();
              }}
                onChangeText={(text) => setuname(text)}
                returnKeyType='next' cursorColor={'red'} keyboardType='default' autoCapitalize="none" className="w-full p-2 text-xl" placeholder='Enter User Name' />
            </View >
            <View className="border-indigo-500 border-[2px] rounded-xl mb-4">
              <TextInput onSubmitEditing={() => {
                onLogin();
              }}
                onChangeText={(text) => setupassword(text)}
                ref={password} returnKeyType='default' cursorColor={'red'} keyboardType='default' className="w-full p-2 text-xl" secureTextEntry placeholder='Enter User Name' />
            </View >
            {!isLoading ? <TouchableOpacity onPress={onLogin} className="bg-green-500 h-16 rounded-xl mb-4 items-center justify-center">
              <Text className="font-bold text-2xl">Login</Text>
            </TouchableOpacity > : <ActivityIndicator size={40} color={'red'} />}
          </View>
        </View>
      </ScrollView>
    </>
  )
}