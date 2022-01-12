/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native-web';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

import { theme } from './src/config';
import store from './src/store';
import Navigation from './src/Navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}
