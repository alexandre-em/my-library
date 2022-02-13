import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import CardBook from 'components/CardBook';
import jwtDecode from 'jwt-decode';
import { getAllBookRead } from 'services/users';
import { Paragraph } from 'react-native-paper';

import NotConnected from 'assets/undraw_Access_account_re_8spm.png';

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Roboto_900Black',
    fontSize: 30,
    margin: 10,
  },
  containerGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemGrid: {
    flexGrow: 1,
  },
  containerCard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

  },
  footerScroll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default function Profil() {
  const auth = useSelector((state) => state.auth);
  const [bookRead, setbookRead] = useState([]);

  const getBooksUser = useCallback(() => {
    if (auth.isAuthenticated) {
      const token = jwtDecode(auth.accessToken);
      getAllBookRead(auth.accessToken, token.sub, 0)
        .then((res) => {
          setbookRead(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth.isAuthenticated, auth.accessToken]);

  useEffect(() => {
    getBooksUser();
  }, []);

  return (

    auth.isAuthenticated
      ? (
        <ScrollView>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.title}>Historique de vos lecture</Text>
          </View>

          <View style={styles.containerCard}>
            {bookRead.map((item) => <CardBook key={item.id} item={item} type="profilCard" />)}
          </View>
        </ScrollView>
      )

      : (
        <View style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30, width: '100%', height: '100%',
        }}
        >
          <Image
            source={NotConnected}
            width="100%"
            height="100%"
            style={{
              maxWidth: 500, maxHeight: 500, height: '100%', width: '100%', resizeMode: 'contain',
            }}
          />
          <Paragraph style={{ fontFamily: 'Roboto_900Black', fontSize: 17, textAlign: 'center' }}>
            Vous n&apos;êtes pas connecté
          </Paragraph>
        </View>
      )

  );
}
