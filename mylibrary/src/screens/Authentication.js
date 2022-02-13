import React, { useCallback } from 'react';
import {
  Dimensions, Image, StyleSheet, View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { authSlice } from 'store';
import { useAuthentication } from 'hooks';
import Book from 'assets/undraw_Books_l33t.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Roboto_900Black',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Authentication() {
  const dispatch = useDispatch();
  const { request, login } = useAuthentication();

  const width = Math.min(400, Dimensions.get('window').width * 0.75);

  const handleSkip = useCallback(() => {
    dispatch(authSlice.actions.set({
      authentication: null,
      isAuthenticated: false,
      isGuest: true,
    }));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Library</Text>
      <Image
        source={Book}
        style={{
          width: '100%', height: '100%', maxWidth: 650, maxHeight: 400, resizeMode: 'contain',
        }}
        width={width}
        height={width}
      />
      <View style={styles.buttons}>
        <Button style={{ margin: 5 }} labelStyle={{ color: 'white' }} disabled={!request} mode="contained" icon="account-check" onPress={login}>
          Sign in
        </Button>
        <Button style={{ margin: 5 }} icon="alien" onPress={handleSkip}>Continue</Button>
      </View>
    </View>
  );
}
