import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getAllAuthor } from 'services/authors';
import { Button } from 'react-native-paper';
import CardAuthor from 'components/CardAuthor';
export default function Author() {

    
    const [authorsQuery, setAuthorsQuery] = useState([]);
    const [page, setPage] = useState(0);
    
    const [totalPage, setTotalPage] = useState(0);
    
    useEffect(() => {
      getAllAuthor(0)
      .then((res)=>{
          setPage(0)
          setAuthorsQuery(res.data.data);
          setTotalPage(res.data.totalPage)
      })
      .catch((err)=>{
          console.log(err);
      })
    },[]);

    
    const changePage = (nb) =>{
        if((nb+page < totalPage) && (page+nb >=0)){
            getAllAuthor(nb+page).then((res)=>{
            setPage(nb+page);
            setAuthorsQuery(res.data.data);
          })
        }
    }
    

    


    return (
        <ScrollView>
          <View style={styles.containerCard}>
          {authorsQuery.map(element =>
            <CardAuthor key={element.id} item = {element}></CardAuthor>)
            
          }
          </View>
            <View style={styles.footerScroll}>
                {page-1 >=0?<Button style={styles.buttonType} mode="contained" onPress={() => changePage(-1)}>{"<"}</Button>:<></>}
                <Text style={{marginTop:8}}>{page}</Text>
                {1+page < totalPage?<Button style={styles.buttonType} mode="contained" onPress={() => changePage(1)}>{">"}</Button>:<></>}
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    flatlist: {
      flexDirection: 'column',
    },
    buttonType : {
      width:"5%",
      marginRight:30,
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
    buttonType : {
      width:"5%",
      marginRight:30,
      marginLeft: 30,
    },
  });