import React, { useEffect, useState } from 'react';
import { Alert, Button, Platform, Text, StyleSheet, View } from 'react-native';
import jwtDecode from 'jwt-decode';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AUTH0_DOMAIN, AUTH0_AUDIENCE, AUTH0_ID } from '@env';

if (Platform.OS === 'web') { WebBrowser.maybeCompleteAuthSession(); }

const auth0ClientId = AUTH0_ID;
const authorizationEndpoint = `https://${AUTH0_DOMAIN}/authorize`;

const useProxy = Platform.select({ native: true, default: false });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });



export default function Login({navigation}) {
    const [name, setName] = useState(null);

    const [request, response, promptAsync] = AuthSession.useAuthRequest({
        redirectUri,
        clientId: auth0ClientId,
        responseType: AuthSession.ResponseType.Token,
        scopes: ["openid", "profile", "email"],
        extraParams: {
          audience: `${AUTH0_AUDIENCE}`,
        },
      },
      { authorizationEndpoint });
  
    useEffect(() => {
      if (response?.type === 'success' && response.authentication?.accessToken) {
        const { accessToken } = response.authentication;
  
        console.log(accessToken);
        navigation.navigate("Home")
      }
    }, [request, response])
  
    return (
      <View style={styles.container}>
        {name ? (
          <>
            <Text style={styles.title}>You are logged in, {name}!</Text>
            <Button title="Log out" onPress={() => setName(null)} />
          </>
        ) : (
          <Button
            disabled={!request}
            title="Log in with Auth0"
            onPress={() => promptAsync({ useProxy })}
          />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40,
    },
  });
  