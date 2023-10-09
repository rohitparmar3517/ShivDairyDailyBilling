import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import baseUrl from './const';
import axios from 'axios';

export default function AddPartyScreen({ navigation }) {

  const [ename, setename] = useState('')
  const [gname, setgname] = useState('')
  const [number, setnumber] = useState('')
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Party',
      headerStyle: {
        backgroundColor: '#111827',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 24
      },
      headerTitleAlign: 'center',
    })

  }, [])

  function onSave() {
    if (ename == "" || gname == "" || number == "") {
      Toast.show({
        type: 'error',
        text1: 'Enter Name & Number',
      });
    } else {
      userSave()
    }
  }

  var userSave = async () => {
    setLoading(true)
    axios.post(baseUrl, {
      'phone': number,
      'name': ename,
      'guj_name': gname,
      'method': 'register',
    }).then(res => {
      setLoading(false)
      if (res.data.status) {
        Toast.show({
          type: 'success',
          text1: res.data.msg,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.data.msg,
        });
      }
      navigation.goBack(null)
    }).catch(err => {
      setLoading(false)
    })
  }



  return (
    <View className="flex-1 bg-gray-900">
      <View className="mt-10 pl-4 pr-4">
        <ScrollView>
          <TextInput value={ename} onChangeText={(text) => { setename(text) }} keyboardType='default' className="w-full bg-gray-50 rounded-md h-12 px-4 mb-4" placeholder='Enter Party Name (English)' />
          <TextInput value={gname} onChangeText={(text) => { setgname(text) }} keyboardType='default' className="w-full bg-gray-50 rounded-md h-12 px-4 mb-4" placeholder='Enter Party Name (Gujarati)' />
          <TextInput value={number} onChangeText={(text) => { setnumber(text) }} keyboardType='numeric' className="w-full bg-gray-50 rounded-md h-12 px-4 mb-4" placeholder='Enter Party Mobile No' />
          <TouchableOpacity onPress={onSave}>
            <View className="w-full justify-center items-center h-12 rounded-md bg-green-500">
              <Text className="text-white font-bold text-2xl">Save</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}