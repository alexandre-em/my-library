import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { publicSearch, userSearch } from 'services';
import CardBook from 'components/CardBook';
import jwt_decode from "jwt-decode";
import { getAllAuthor } from 'services/authors';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
export default function Author() {

    const auth = useSelector((state) => state.auth);
    const [authorsQuery, setAuthorsQuery] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [detail, setdetail] = useState(false);

    useEffect(() => {
        getAuthors(0);
    },[]);


    const getAuthors = (nb) =>{
        getAllAuthor(nb)
            .then((res)=>{
                setPage(nb+page)
                setAuthorsQuery(res.data.data);
                setTotalPage(res.data.totalPage)
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    
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
            <View style={styles.containerGrid}>
            {
                 authorsQuery.map((element) =>
                    <Card key={element.id} style={{width:'300px', margin:10}}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Title style={{textOverflow: 'ellipsis',overflow: 'hidden' }} title={element.name} />
                        <Card.Actions>
                            <Button>View more</Button>
                        </Card.Actions>
                    </Card>
                )
            }
            </View>
            
             <View style={styles.footerScroll}>
                {page-1 >=0?<Button style={{width:"5%",marginRight:30}} mode="contained" onPress={() => changePage(-1)}>{"<"}</Button>:<></>}
                <Text style={{marginTop:8}}>{page}</Text>
                {1+page < totalPage?<Button style={{width:"5%",marginRight:30}} mode="contained" onPress={() => changePage(1)}>{">"}</Button>:<></>}
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
      justifyContent: 'center',
    },
    itemGrid: {
      flexGrow: 1,
    },
    containerCard :{
      dispay : 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      
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