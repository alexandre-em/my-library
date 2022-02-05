import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CardBook from 'components/CardBook';
import jwt_decode from "jwt-decode";
import { getAllBookRead } from 'services/users';


export default function Profil() {

    const auth = useSelector((state) => state.auth);
    const [bookRead, setbookRead] = useState([]);

    useEffect(() => {
        getBooksUser();
    },[]);

    const getBooksUser = () =>{
        console.log(auth.isAuthenticated)
        if(auth.isAuthenticated){
            const token = jwt_decode(auth.accessToken);
            getAllBookRead(auth.accessToken, token.sub, 0)
            .then((res)=>{
                console.log(res.data.data);
                setbookRead(res.data.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    

    return (
        
            auth.isAuthenticated ? 
                <ScrollView>
            
                <Text>Historique de vos lecture</Text>
                <View style={styles.containerCard}>
                {bookRead.map(item=>
                    <CardBook key={item.id} item = {item} type="profilCard"></CardBook>
                )}
                </View>
               </ScrollView>
                
            : <View style={{display:'flex', justifyContent:'center',flexDirection: 'row', marginTop:30}}>
                <Text style={{fontFamily:'Roboto_500Medium'}}>Vous n'êtes pas connecté</Text>
            </View>
             
        
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