import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import WatchScreen from '../screens/WatchScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SeriesScreen from '../screens/SeriesScreen';
import MyListScreen from '../screens/MyListScreen';
import VideoDetailsScreen from '../screens/VideoDetailsScreen';
import SeriesDetailsScreen from '../screens/SeriesDetailsScreen';
import SeasonDetailsScreen from '../screens/SeasonDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { activeUser } = useSelector((state) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {activeUser ? (
        <>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Watch' component={WatchScreen} />
          <Stack.Screen name='Movies' component={MoviesScreen} />
          <Stack.Screen name='Series' component={SeriesScreen} />
          <Stack.Screen name='MyList' component={MyListScreen} />
          <Stack.Screen name='VideoDetails' component={VideoDetailsScreen} />
          <Stack.Screen name='SeriesDetails' component={SeriesDetailsScreen} />
          <Stack.Screen name='SeasonDetails' component={SeasonDetailsScreen} />
        </>
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
