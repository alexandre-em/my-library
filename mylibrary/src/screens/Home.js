import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import {
  Search, Books, Author, Profil,
} from 'screens';

export default function Home() {
  const [index, setIndex] = useState(0);

  const searchRoute = () => <Search />;
  const booksRoute = () => <Books />;
  const authorsRoute = () => <Author />;
  const profilRoute = () => <Profil />;

  const [routes] = useState([
    { key: 'books', title: 'Books', icon: 'book' },
    { key: 'search', title: 'Search', icon: 'file-search-outline' },
    { key: 'authors', title: 'Authors', icon: 'ticket-account' },
    { key: 'profil', title: 'Mon profil', icon: 'ticket-account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    search: searchRoute,
    books: booksRoute,
    authors: authorsRoute,
    profil: profilRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />

  );
}
