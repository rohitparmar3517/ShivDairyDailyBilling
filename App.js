import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Splashscreen from './screens/SplashScreen';
import Toast from 'react-native-toast-message';
import DashboardScreen from './screens/DashboardScreen';
import PartyScreen from './screens/PartyScreen';

const Stack = createNativeStackNavigator();



function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splashscreen} />
          <Stack.Screen name="Login" options={{ headerShown: false, animation: 'fade' }} component={LoginScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false, animation: 'fade' }} component={DashboardScreen} />
          <Stack.Screen name="Party" options={{ animation: 'slide_from_bottom' }} component={PartyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;