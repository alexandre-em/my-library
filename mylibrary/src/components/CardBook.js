import React, { useState, useCallback } from 'react';
import { ScrollView, Dimensions, Image } from 'react-native';
import {
  Button, Card, Paragraph, Dialog, Portal, ActivityIndicator,
} from 'react-native-paper';
import { getContentByID } from 'services';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import propTypes from 'prop-types';

import { bookRead } from 'services/users';
import { useLoader } from 'hooks';

import NotConnected from 'assets/undraw_Access_account_re_8spm.png';

export default function CardBook({ item, type }) {
  const {
    title, author, image, id,
  } = item;
  const auth = useSelector((state) => state.auth);
  const noImage = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  const windowHeight = Dimensions.get('window').height;

  const [visible, setVisible] = useState(false);

  const manageDialog = () => setVisible((prevState) => !prevState);

  const [content, setContent] = useState('');
  const { loaderState, setToLoading } = useLoader();

  const getContent = useCallback(() => {
    setToLoading({ book: true });
    if (auth.isAuthenticated) {
      getContentByID(auth.accessToken, id)
        .then((res) => {
          setContent(res.data.booksContent);
          setToLoading({ book: false });
        })
        .catch((err) => {
          console.log(err);
          setToLoading({ book: false });
        });
    }
  }, [id]);

  const openDialog = useCallback(() => {
    manageDialog();
    getContent(id);
    if (auth.isAuthenticated) {
      const token = jwtDecode(auth.accessToken);
      bookRead(token.sub, id, auth.accessToken).then(() => {
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      {
        type === 'profilCard' ? (
          <Card style={{ width: 200, margin: 10 }}>
            <Card.Cover source={{ uri: image || noImage }} />
            <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} title={title} subtitle={author} />
            <Card.Actions>
              <Button onPress={() => openDialog(id)}>View more</Button>
            </Card.Actions>
          </Card>
        )
          : (
            <Card style={{ width: 200, margin: 10 }}>
              <Card.Cover source={{ uri: image || noImage }} />
              <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} title={title} subtitle={author} />
              <Card.Actions>
                <Button onPress={() => openDialog(id)}>View more</Button>

              </Card.Actions>
            </Card>
          )
          }
      <Portal>
        <Dialog visible={visible} onDismiss={manageDialog} style={{ height: windowHeight }}>
          <Dialog.Title>{title}</Dialog.Title>
          {auth.isAuthenticated ? (
            <Dialog.ScrollArea>
              {loaderState.book && (
              <ActivityIndicator
                animating
                size={45}
                style={{
                  position: 'absolute', left: '50%', bottom: '50%', zIndex: 100,
                }}
              />
              )}
              <ScrollView>
                <Paragraph>
                  {content}
                </Paragraph>
              </ScrollView>
            </Dialog.ScrollArea>
          ) : (
            <Dialog.ScrollArea style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            </Dialog.ScrollArea>
          )}
          <Dialog.Actions>
            <Button onPress={() => manageDialog()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

CardBook.propTypes = {
  item: propTypes.shape({
    title: propTypes.string,
    author: propTypes.string,
    image: propTypes.string,
    id: propTypes.string,
  }),
  type: propTypes.string,
};

CardBook.defaultProps = {
  item: {
    title: '',
    author: '',
    image: '',
    id: '',
  },
  type: '',
};
