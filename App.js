import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Splashscreen from './screens/SplashScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splashscreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
