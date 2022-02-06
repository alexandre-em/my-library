import CardBook from 'components/CardBook';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getAll } from 'services';
import { Button } from 'react-native-paper';
import jwt_decode from "jwt-decode";
import { userSuggestion } from 'services/users';
import { Title } from 'react-native-paper';

export default function Books() {
    const [publicBooks, setPublicBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const auth = useSelector((state) => state.auth);
    const [suggest, setSuggest] = useState([]);
  
    useEffect(() => {
        suggestion();
        getAll(0,10)
          .then((res) => {
            setPublicBooks(res.data.data);
            setTotalPage(res.data.totalPage)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    const changePage = (nb) =>{
        if((nb+page < totalPage) && (page+nb >=0)){
          getAll(nb+page,10).then((res)=>{
            setPage(nb+page);
            setPublicBooks(res.data.data);
          })
        }
    }

    const suggestion = () =>{

      if(auth.isAuthenticated){
        const token = jwt_decode(auth.accessToken);

        userSuggestion(token.sub,auth.accessToken)
        .then((res)=>{
          setSuggest(res.data.data);
        })
      }
    }

    

return(
    <ScrollView>

      {auth.isAuthenticated&&
      <View style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
          <Title style={styles.title}>Suggestion</Title>
        </View>}
        <ScrollView horizontal>
          <View style={styles.suggestCard}>
              {suggest.map(item=>
              <CardBook key={item.id} item = {item}></CardBook>
              )}
          </View>
        </ScrollView>
        
        <View style={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
          <Text style={styles.title}>Liste des livres</Text>
        </View>
        <View style={styles.containerCard}>
            {publicBooks.map(item=>
            <CardBook key={item.id} item = {item}></CardBook>
            )}
        </View>
        <View style={styles.footerScroll}>
            {page-1 >=0?<Button style={styles.buttonType} mode="contained" onPress={() => changePage(-1)}>{"<"}</Button>:<></>}
            <Text style={{marginTop:10}}>{page}</Text>
            {1+page < totalPage?<Button style={styles.buttonType} mode="contained" onPress={() => changePage(1)}>{">"}</Button>:<></>}
        </View>
    </ScrollView>
    );
}


const styles = StyleSheet.create({
    flatlist: {
      flexDirection: 'column',
    },
    title:{
      fontFamily:"Roboto_900Black",
      fontSize:30,
      margin:10,
    },
    buttonType : {
      width:"5%",
      marginRight:30,
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
    suggestCard :{
      display : 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
    },
    containerCard :{
      display : 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    footerScroll :{
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 10,
      marginRight : 10,
    },
  });