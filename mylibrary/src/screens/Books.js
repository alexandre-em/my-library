import CardBook from 'components/CardBook';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { getAll, getId } from 'services';
import { Button } from 'react-native-paper';


export default function Books() {
    const [publicBooks, setPublicBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
    
        getAll()
          .then((res) => {
            // setBooks(books => [...books, res])
            console.log(auth.accessToken); // contient le token pour les requetes prives (si login)
            console.log(res);
            setPublicBooks(res.data.data);
            setTotalPage(res.data.totalPage)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    const changePage = (nb) =>{
        if((nb+page < totalPage) && (page+nb >=0)){
          getAll(nb+page,20).then((res)=>{
            setPage(nb+page);
            setPublicBooks(res.data.data);
          })
        }
    }

return(
    <ScrollView>
        {console.log(auth)}
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