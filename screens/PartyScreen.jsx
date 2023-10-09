import { View, Text, RefreshControl, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import baseUrl from './const';
import axios from 'axios';
import { Icon } from '@rneui/themed';
import Toast from 'react-native-toast-message';

export default function PartyScreen({ navigation }) {

  const [user, setuser] = useState([])
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Party',
      headerStyle: {
        backgroundColor: '#111827',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 24
      },
      headerTitleAlign: 'center',
    })
    userLoad()
  }, [])


  var userLoad = async () => {
    setLoading(true)
    axios.post(baseUrl, {
      'method': 'alluser',
    }).then(res => {
      setLoading(false)
      setuser(res.data)
    }).catch(err => {
      setLoading(false)
    })
  }

  var userDelete = async (id) => {
    axios.post(baseUrl, {
      'method': 'deleteUser',
      'uid': id,
    }).then(res => {
      userLoad()
      if (res.data.status) {
        Toast.show({
          type: 'success',
          text1: `${res.data.msg}`,
        });
      }
    }).catch(err => {
    })
  }

  return (
    <>
      {isLoading ? <View className="flex-1 bg-gray-900 justify-center">
        <ActivityIndicator size={75} color={'red'} />
      </View> :
        <View className="flex-1 bg-gray-900">
          <View className="mt-3 p-2">
            <ScrollView bounces={true} className="w-full h-full" refreshControl={<RefreshControl onRefresh={userLoad} />}>
              {user.map((items) => {
                return <TouchableOpacity key={items.user_id} onPress={() => {
                }}>
                  <View className="bg-white rounded-md flex-row h-16 mb-3 items-center justify-start">
                    <Icon name='person' size={30} color={'black'} />
                    <View className="flex-1 flex-row justify-between m-2">
                      <Text numberOfLines={1} className="text-xl text-blue-500 font-bold">{items.name}</Text>
                      {/* <Text numberOfLines={1} className="text-xl text-blue-500 font-bold">{items.guj_name}</Text> */}
                      <TouchableOpacity onPress={() => {
                        // TODO:
                        Alert.alert(`Delete ${items.name} ?`, '', [
                          {
                            text: 'Yes',
                            onPress: () => { userDelete(items.user_id) },
                            style: 'destructive',

                          },
                          {
                            text: 'No',
                            style: 'default',
                          },
                        ])

                      }}>
                        <Icon name='delete' size={30} color={'red'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>

              })}
            </ScrollView>
          </View>
        </View>
      }
    </>
  )
}