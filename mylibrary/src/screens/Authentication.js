import React, { useCallback, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { authSlice } from 'store';
import useAuthentication from 'hooks/useAuthentication';
import svgXml from 'assets/undraw_books_l-33-t.svg';
import SvgDisplay from 'components/SvgDisplay';

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
  },
});

export default function Authentication() {
  const dispatch = useDispatch();
  const { request, login } = useAuthentication();

  const imageWidth = Math.min(400, Dimensions.get('window').width * 0.75);

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
      <SvgDisplay xml={svgXml} width={imageWidth} height={300} />
      <View style={styles.buttons}>
        <Button labelStyle={{ color: 'white' }} disabled={!request} mode="contained" icon="account-check" onPress={login}>
          Sign in
        </Button>
        <Button icon="alien" onPress={handleSkip}>Continue</Button>
      </View>
    </View>
  );
}
