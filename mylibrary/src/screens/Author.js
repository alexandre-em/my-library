import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';

import { CardAuthor } from 'components';
import { getAllAuthor } from 'services';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { useLoader } from 'hooks';

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

const numberOfItemsPerPageList = [10, 20, 50, 100];

export default function Author() {
  const [authorsQuery, setAuthorsQuery] = useState([]);
  const [page, setPage] = useState(0);

  const [totalPage, setTotalPage] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [authorsPerPage, setAuthorsPerPage] = useState(10);
  const { setToLoading, loaderState } = useLoader();

  useEffect(() => {
    setToLoading({ authors: true });
    getAllAuthor(page, authorsPerPage)
      .then((res) => {
        setAuthorsQuery(res.data.data);
        setTotalPage(res.data.totalPage);
        setTotalAuthors(res.data.totalElement);
        setToLoading({ authors: false });
      })
      .catch((err) => {
        console.log(err);
        setToLoading({ authors: false });
      });
  }, [page, authorsPerPage]);

  return (
    <ScrollView>
      {loaderState.authors && (
      <ActivityIndicator
        animating
        size={45}
      />
      )}
      <View style={styles.containerCard}>
        {authorsQuery.map((element) => <CardAuthor key={element.id} item={element} />)}
      </View>
      <View style={styles.footerScroll}>
        <DataTable.Pagination
          page={page}
          numberOfPages={totalPage}
          onPageChange={(p) => setPage(p)}
          label={`${page * authorsPerPage} of ${totalAuthors}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={authorsPerPage}
          onItemsPerPageChange={setAuthorsPerPage}
          selectPageDropdownLabel="Books per page"
        />
      </View>

    </ScrollView>
  );
}
