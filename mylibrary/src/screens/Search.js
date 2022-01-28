import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import { publicSearch, userSearch } from 'services';
import CardBook from 'components/CardBook';

export default function Search() {

    const auth = useSelector((state) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [publicBooks, setPublicBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const onChangeSearch = query => setSearchQuery(query);

    const changePage = (nb) =>{
        if((nb+page < totalPage) && (page+nb >=0)){
          getAll(nb+page,20).then((res)=>{
            setPage(nb+page);
            setPublicBooks(res.data.data);
          })
        }
    }

    const searchBook = () =>{
        if(auth.isAuthenticated){
            userSearch(searchQuery, auth.accessToken)
            .then((res)=>{
                console.log(res);
                setPublicBooks(res.data.data);
                setTotalPage(res.data.totalPage)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else{
            publicSearch(searchQuery)
            .then((res)=>{
                console.log(res);
                setPublicBooks(res.data.data);
                setTotalPage(res.data.totalPage)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    return (
        <ScrollView>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={()=>searchBook()}
                onSubmitEditing={()=>searchBook()}
            />
            <View style={styles.containerCard}>
                {publicBooks.map(item=>
                    <CardBook key={item.id} item = {item}></CardBook>
                )}
            </View>
            <View style={{display:'flex',flexDirection: 'row'}}>
                {page-1 >=0?<Button style={{width:"5%"}} mode="contained" onPress={() => changePage(-1)}>{"<"}</Button>:<></>}
                <Text style={{marginTop:8}}>{page}</Text>
                {1+page < totalPage?<Button style={{width:"5%"}} mode="contained" onPress={() => changePage(1)}>{">"}</Button>:<></>}
            </View>
        </ScrollView>
    );
}

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