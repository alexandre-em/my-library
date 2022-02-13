import CardBook from 'components/CardBook';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ActivityIndicator, DataTable, Title } from 'react-native-paper';
import jwtDecode from 'jwt-decode';

import { getAll, userSuggestion } from 'services';
import { useLoader } from 'hooks';

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Roboto_900Black',
    fontSize: 30,
    margin: 10,
  },
  buttonType: {
    width: '5%',
    marginRight: 30,
    marginLeft: 30,
  },
  containerGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemGrid: {
    flexGrow: 1,
  },
  suggestCard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
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

const numberOfItemsPerPageList = [10, 20, 50, 100];

export default function Books() {
  const [publicBooks, setPublicBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [totalBooks, setTotalBooks] = useState(0);
  const auth = useSelector((state) => state.auth);
  const [suggest, setSuggest] = useState([]);
  const { loaderState, setToLoading } = useLoader();

  const suggestion = () => {
    if (auth.isAuthenticated) {
      const token = jwtDecode(auth.accessToken);

      userSuggestion(token.sub, auth.accessToken)
        .then((res) => {
          setSuggest(res.data.data);
        });
    }
  };

  useEffect(() => {
    setToLoading({ books: true });
    suggestion();
    getAll(page, booksPerPage)
      .then((res) => {
        setPublicBooks(res.data.data);
        setTotalPage(res.data.totalPage);
        setTotalBooks(res.data.totalElement);
        setToLoading({ books: false });
      })
      .catch((err) => {
        setToLoading({ books: false });
        console.log(err);
      });
  }, [page, booksPerPage]);

  return (
    <ScrollView>
      {auth.isAuthenticated
      && (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Title style={styles.title}>Suggestion</Title>
      </View>
      )}
      <ScrollView horizontal>
        <View style={styles.suggestCard}>
          {suggest.map((item) => <CardBook key={item.id} item={item} />)}
        </View>
      </ScrollView>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.title}>Liste des livres</Text>
      </View>

      {loaderState.books && (
      <ActivityIndicator
        animating
        size={45}
        style={{
          position: 'absolute', left: '50%', bottom: '50%', zIndex: 100,
        }}
      />
      )}

      <View style={styles.containerCard}>
        {publicBooks.map((item) => <CardBook key={item.id} item={item} />)}
      </View>
      <View style={styles.footerScroll}>
        <DataTable.Pagination
          page={page}
          numberOfPages={totalPage}
          onPageChange={(p) => setPage(p)}
          label={`${page * booksPerPage} of ${totalBooks}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={booksPerPage}
          onItemsPerPageChange={setBooksPerPage}
          selectPageDropdownLabel="Books per page"
        />
      </View>
    </ScrollView>
  );
}
