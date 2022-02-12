import React, { useEffect, useState } from 'react';
import {
  ScrollView, Dimensions, Text, View,
} from 'react-native';
import {
  Avatar,
  Button, Card, Dialog, Divider, Portal,
} from 'react-native-paper';
import propsType from 'prop-types';

import { getAuthorDetails } from 'services';

import profil1 from 'assets/profil1.png';
import profil2 from 'assets/profil2.png';
import profil3 from 'assets/profil3.png';
import profil4 from 'assets/profil4.png';

export default function CardAuthor({ item }) {
  const { name, id } = item;
  const windowHeight = Dimensions.get('window').height;
  const avatarList = [profil1, profil2, profil3, profil4];

  const [authorsBooks, setAuthorsBooks] = useState([]);
  const [visible, setVisible] = useState(false);

  const manageDialog = () => setVisible((prevState) => !prevState);

  useEffect(() => {
    if (visible) {
      getAuthorDetails(id)
        .then((res) => {
          setAuthorsBooks(res.data.books);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [visible]);

  return (
    <>
      <Card key={id} style={{ width: 300, margin: 10 }}>
        <Card.Content style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Avatar.Image size={150} source={avatarList[name.charCodeAt(0) % avatarList.length]} />
        </Card.Content>
        <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} title={name} />
        <Card.Actions>
          <Button onPress={() => {
            manageDialog();
          }}
          >
            View more
          </Button>
        </Card.Actions>
      </Card>

      <Portal>
        <Dialog visible={visible} onDismiss={manageDialog} style={{ height: windowHeight }}>
          <Dialog.Title>Author&apos;s books</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              {authorsBooks.map((book) => (
                <View key={book.id}>
                  <Dialog.Title>{book.title}</Dialog.Title>
                  <Dialog.Content>
                    <Text>
                      Date de publication:
                      {book.year}
                    </Text>
                  </Dialog.Content>
                  <Divider />
                </View>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => manageDialog()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>

  );
}

CardAuthor.propTypes = {
  item: propsType.shape({
    name: propsType.string,
    id: propsType.string,
  }),
};

CardAuthor.defaultProps = {
  item: {
    name: '',
    id: '',
  },
};
