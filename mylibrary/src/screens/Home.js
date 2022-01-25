import React, { useEffect, useState } from 'react';
import { Image, Text, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { getAll, getId } from 'services';
import noImage from 'assets/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
import CardBook from 'components/CardBook';
import SearchBar from 'components/SearchBar';


const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
  },
  containerGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemGrid: {
    flexGrow: 1,
  },
  containerCard :{
    dispay : 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default function Home() {
  const [publicBooks, setPublicBooks] = useState([]);
  const [searchBook, setSearchBook] = useState([]);
  const [renderBook, setRenderBook] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getAll()
      .then((res) => {
        // setBooks(books => [...books, res])
        console.log(auth.accessToken); // contient le token pour les requetes prives (si login)
        console.log(res);
        setPublicBooks(res.data.data);
        setRenderBook(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchById = (id) => {
    getId(id)
      .then((res) => {
        console.log(res);
        setSearchBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contains = (text, book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const textSearch = text.toLowerCase();
    if (title.includes(textSearch) || author.includes(textSearch)) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    const dataBook = publicBooks.filter((book) => contains(text, book));
    console.log(dataBook);
    // setPublicBooks(dataBook)
    if (dataBook) {
      setRenderBook(dataBook);
    } else {
      setRenderBook(publicBooks);
    }
  };

  return (
    <ScrollView>
      <SearchBar />
      <View style={styles.containerCard}>
        {publicBooks.map(item=>
          <CardBook key={item.id} item = {item}></CardBook>
        )}
      </View>
      
      {/*<TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => handleSearch(text)}
        status="info"
        placeholder="Search"
        textStyle={{ color: '#000' }}
      />
      <Button labelStyle={{ color: 'white' }} disabled={!searchBook} mode="contained">Search</Button>

      <Text>Recommandation</Text>
      
      <View>
        <FlatList
          style={styles.flatlist}
          data={renderBook}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Image
                style={{
                  width: 260,
                  height: 300,
                  borderWidth: 2,
                  resizeMode: 'contain',
                  margin: 8,
                }}
                source={noImage}
              />
              <Text>{item.title}</Text>
              <CardBook title = {item.title} author = {item.author}></CardBook>
            </View>
          )}
        />
              </View>*/}



    </ScrollView>
  );
}
