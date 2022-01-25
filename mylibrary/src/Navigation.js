import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';

import { screens as screen } from 'config';
import { Authentication, Home } from 'screens';
import useAuthentication from 'hooks/useAuthentication';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { auth: { isAuthenticated, isGuest }, request, login, logout } = useAuthentication();

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
      >
        Sign in
      </Button>
    );
  }, [isAuthenticated, login, logout, request]);

  if (isAuthenticated !== true && isGuest !== true) {
    return <Authentication />;
  }
//ajout des routes
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen.Home}>
        <Stack.Screen name={screen.Home} component={Home} options={{ headerRight: logButton }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
