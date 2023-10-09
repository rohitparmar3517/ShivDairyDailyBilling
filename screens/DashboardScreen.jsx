import { View, Text, StatusBar, TouchableOpacity, Vibration } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <View className="bg-gray-900 flex-1">
        {/* Header */}
        <View className="h-14 justify-center border-b-2 border-white items-center flex-row">
          <View className="flex-1 items-center ">
            <Text className="text-2xl font-extrabold text-white">Dashboard</Text>
          </View>
          <TouchableOpacity onPress={async () => {
            Vibration.vibrate(1)
            await AsyncStorage.setItem('login', 'false');
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                },
              ],
            });
          }}>
            <View className="flex-2 mr-1">
              <Icon name='logout' size={25} color={'red'} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Middel */}
        <View className="flex-1 justify-center items-center">
          <View className="flex-row flex-wrap p-5  justify-around gap-y-11">
            <TouchableOpacity onPress={() => {
              navigation.navigate('Party')
            }}>
              <View className="bg-white p-5 rounded-xl justify-center items-center">
                <Icon
                  name='person' size={100} color={'green'} />
                <Text className="text-2xl font-extrabold text-black">Party</Text>
              </View>
            </TouchableOpacity>

            <View className="bg-white p-5 rounded-xl justify-center items-center">
              <Icon
                name='person' size={100} color={'green'} />
              <Text className="text-2xl font-extrabold text-black">Party</Text>
            </View>

            <View className="bg-white p-5 rounded-xl justify-center items-center">
              <Icon
                name='person' size={100} color={'green'} />
              <Text className="text-2xl font-extrabold text-black">Party</Text>
            </View>

            <View className="bg-white p-5 rounded-xl justify-center items-center">
              <Icon
                name='person' size={100} color={'green'} />
              <Text className="text-2xl font-extrabold text-black">Party</Text>
            </View>
          </View>
        </View>
        {/* Footer */}
        <View className="h-16 justify-center border-t-2 border-white items-center flex-row">
          <View className="flex-1 items-center">
            <Text numberOfLines={1} className="text-[18px] font-extrabold text-orange-600">Design & Developed By Hi-Tech Computer</Text>
          </View>
        </View>

      </View>
    </>
  )
}