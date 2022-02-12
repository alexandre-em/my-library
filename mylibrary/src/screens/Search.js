import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import {
  Searchbar, Button, Menu, Chip, DataTable,
} from 'react-native-paper';

import { publicSearch, userSearch } from 'services';
import { CardBook } from 'components';

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
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

export default function Search() {
  const auth = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [publicBooks, setPublicBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [totalBooks, setTotalBooks] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState('DEFAULT');
  const onChangeSearch = (query) => setSearchQuery(query);

  const searchBook = useCallback((p, bpp) => {
    if (auth.isAuthenticated) {
      userSearch(searchQuery, auth.accessToken, selectedValue, p, bpp)
        .then((res) => {
          setPublicBooks(res.data.data);
          setTotalPage(res.data.totalPage);
          setTotalBooks(res.data.totalElement);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      publicSearch(searchQuery, selectedValue, p, bpp)
        .then((res) => {
          setPublicBooks(res.data.data);
          setTotalPage(res.data.totalPage);
          setTotalBooks(res.data.totalElement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth, searchQuery, selectedValue]);

  useEffect(() => {
    searchBook(page, booksPerPage);
  }, [page, booksPerPage]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setShowMenu(false);
  };

  return (
    <ScrollView>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() => searchBook(0, 10)}
        onSubmitEditing={() => searchBook(0, 10)}
        style={{ margin: 10 }}
      />
      <View>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={(
            <Button
              mode="outlined"
              style={{ margin: 10 }}
              onPress={() => setShowMenu(true)}
            >
              Filtres
            </Button>
)}
        >
          <Menu.Item onPress={() => handleSelect('DEFAULT')} title="DEFAULT" />
          <Menu.Item onPress={() => handleSelect('TITLE')} title="TITLE" />
          <Menu.Item onPress={() => handleSelect('AUTHOR')} title="AUTHOR" />
          <Menu.Item onPress={() => handleSelect('YEAR')} title="YEAR" />
          <Menu.Item onPress={() => handleSelect('REGEX')} title="REGEX" />
        </Menu>
        <Chip style={{ margin: 10, width: 'min-content' }}>{selectedValue}</Chip>
      </View>

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
