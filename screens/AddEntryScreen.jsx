import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon } from '@rneui/themed';

export default function AddEntryScreen({ navigation }) {
  const [user, setuser] = useState([])
  const [isLoading, setLoading] = useState(false);
  const windowSize = FlatList.length > 50 ? FlatList.length / 4 : 21;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Entry',
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
  return (
    <>
      {isLoading ? <View className="flex-1 bg-gray-900 justify-center">
        <ActivityIndicator size={75} color={'red'} />
      </View > :
        <View className="flex-1 bg-gray-900">
          <View className="mt-3 p-3">
            <RefreshControl onRefresh={userLoad}>
              <FlatList
                disableVirtualization={true}
                //data={nameData.sort((a, b) => a.name.localeCompare(b.name))}
                data={user.sort(function (a, b) {
                  return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
                })}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.user_id} onPress={() => {

                  }}>
                    <View className="bg-white rounded-md flex-row h-16 mb-3 pl-3 items-center justify-start">
                      <Icon name='person' size={30} color={'black'} />
                      <View className="flex-1 pl-3 flex-row justify-between m-2">
                        <Text numberOfLines={1} className="text-xl text-blue-500 font-bold">{item.name}</Text>
                        {/* <Text numberOfLines={1} className="text-xl text-blue-500 font-bold">{items.guj_name}</Text> */}

                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                getItemLayout={(data, index) => ({
                  length: 80,
                  offset: 80 * index,
                  index,
                })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={windowSize}
                windowSize={windowSize}
                numColumns={1}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </RefreshControl>
          </View></View>
      }
    </>

  )
}