import { useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import {
  useFonts,
  SourGummy_700Bold,
  SourGummy_400Regular,
  SourGummy_500Medium,
  SourGummy_600SemiBold,
} from '@expo-google-fonts/sour-gummy';
import { store, persistor } from './src/redux/rootStore';
import RootNavigator from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({
    SourGummy_400Regular,
    SourGummy_500Medium,
    SourGummy_600SemiBold,
    SourGummy_700Bold,
  });

  const onBeforeLift = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}
      >
        <NavigationContainer>
          <PaperProvider>
            <RootNavigator />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
