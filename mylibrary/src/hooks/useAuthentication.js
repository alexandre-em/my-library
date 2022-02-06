import { useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { AUTH0_DOMAIN, AUTH0_AUDIENCE, AUTH0_ID } from '@env';

import { authSlice } from 'store';

if (Platform.OS === 'web') { WebBrowser.maybeCompleteAuthSession(); }

const auth0ClientId = AUTH0_ID;
const authorizationEndpoint = `https://${AUTH0_DOMAIN}/authorize`;

const useProxy = Platform.select({ native: true, default: false });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function useAuthentication() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //console.log(AUTH0_DOMAIN)
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      responseType: AuthSession.ResponseType.Token,
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        audience: `${AUTH0_AUDIENCE}`,
      },
    },
    { authorizationEndpoint },
  );

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      const { authentication } = response;

      dispatch(authSlice.actions.update({
        ...authentication,
        isAuthenticated: true,
        isGuest: false,
      }));
    }
  }, [dispatch, response]);

  const login = useCallback(() => {
    promptAsync({ useProxy });
  }, [promptAsync]);

  const logout = useCallback(async () => {
    const redirection = AuthSession.makeRedirectUri({ useProxy });
    try {
      WebBrowser
        .openAuthSessionAsync(`https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_ID}&returnTo=${redirection}`);
      await AuthSession.revokeAsync({
        token: auth.accessToken,
        tokenTypeHint: auth.tokenType,
      });
      dispatch(authSlice.actions.reset({
        isAuthenticated: false,
        isGuest: false,
        accessToken: null,
      }), authorizationEndpoint);
    } catch (e) {
      dispatch(authSlice.actions.reset({
        isAuthenticated: false,
        isGuest: false,
        accessToken: null,
      }), authorizationEndpoint);
    }
  }, [auth.accessToken, auth.tokenType, dispatch]);

  return {
    auth,
    request,
    login,
    logout,
  };
}
