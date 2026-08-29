import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { activeUser } = useSelector((state) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {activeUser ? (
        <Stack.Screen name='Home' component={HomeScreen} />
      ) : (
        <Stack.Screen name='Login' component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}
