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
      headerRight: () => (
        <TouchableOpacity onPress={() => { navigation.navigate('AddParty') }}>
          <Icon name='add' size={30} color={'white'} />
        </TouchableOpacity>
      ),
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userLoad()
    });
    return unsubscribe;
  }, [navigation]);


  var userLoad = async () => {
    setLoading(true)
    axios.post(baseUrl, {
      'method': 'alluser',
    }).then(res => {
      setLoading(false)
      // console.warn(res.data);
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
          <View className="mt-3 p-3">
            {user.length == 0 ?
              <View className="w-full h-full justify-center items-center">
                <Text className="text-center text-white text-2xl">No Record Found</Text></View> :
              <ScrollView bounces={true} className="w-full h-full" refreshControl={<RefreshControl onRefresh={userLoad} />}>
                {user.map((items) => {
                  return <TouchableOpacity key={items.user_id} onPress={() => {
                    navigation.navigate('EditParty', {
                      party: items,

                    });
                  }}>
                    <View className="bg-white rounded-md flex-row h-16 mb-3 pl-3 items-center justify-start">
                      <Icon name='person' size={30} color={'black'} />
                      <View className="flex-1 pl-3 flex-row justify-between m-2">
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
              </ScrollView>}

          </View>
        </View>
      }
    </>
  )
}