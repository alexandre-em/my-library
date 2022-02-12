import React, { useState, useCallback } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import {
  Button, Card, Paragraph, Dialog, Portal,
} from 'react-native-paper';
import { getContentByID } from 'services';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import propTypes from 'prop-types';

import { bookRead } from 'services/users';

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

  const getContent = useCallback(() => {
    if (auth.isAuthenticated) {
      getContentByID(auth.accessToken, id)
        .then((res) => {
          setContent(res.data.booksContent);
        })
        .catch((err) => {
          console.log(err);
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
              <ScrollView>
                <Paragraph>
                  {content}
                </Paragraph>
              </ScrollView>
            </Dialog.ScrollArea>
          ) : (
            <Dialog.ScrollArea>
              <Paragraph>
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
