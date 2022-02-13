/* eslint-disable react/jsx-first-prop-new-line */
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { Image } from 'react-native';
import { screens as screen } from 'config';
import { Authentication } from 'screens';
import Home from 'screens/Home';
import { useAuthentication } from 'hooks';

import Logo from 'assets/open-book.png';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {
    auth: { isAuthenticated, isGuest }, request, login, logout,
  } = useAuthentication();

  const logButton = useCallback(() => {
    if (isAuthenticated) {
      return <Button icon="logout" onPress={logout}>Sign out</Button>;
    }
    return (
      <Button
        disabled={!request}
        mode="contained"
        icon="account-check"
        onPress={login}
        style={{ margin: 10 }}
        labelStyle={{ color: '#fff' }}
      >
        Sign in
      </Button>
    );
  }, [isAuthenticated, login, logout, request]);

  const logo = useCallback(() => (
    <Image source={Logo}
      style={{
        width: 60, height: 60,
      }}
    />
  ), []);

  if (isAuthenticated !== true && isGuest !== true) {
    return <Authentication />;
  }
  // ajout des routes
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen.Home}>
        <Stack.Screen name="home"
          component={Home}
          options={{
            headerRight: logButton,
            headerTitle: logo,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
