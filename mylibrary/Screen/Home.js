import axios from 'axios';
import { getRedirectUrl } from 'expo-auth-session';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Platform, Text, StyleSheet, View, FlatList } from 'react-native';

import { SearchBar } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { Input } from 'react-native-elements/dist/input/Input';
import noImage from '../assets/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'

export default function Home() {
    const back = "http://mylibrary-env.eba-fzfmx4pz.eu-west-3.elasticbeanstalk.com/"

    const [publicBooks, setPublicBooks] = useState([]);
    const [searchBook, setSearchBook] = useState([]);
    const [renderBook, setRenderBook] = useState([]);

    useEffect(() => {
        axios.get(back+"api/v1/books/public/all")
        .then((res)=>{
            //setBooks(books => [...books, res])
            console.log(res)
            setPublicBooks(res.data.data);
            setRenderBook(res.data.data);
        })
        .catch((err)=>{console.log(err)});
    },[])


    const searchById = (id) =>{
        axios.get(back+"api/v1/books/public/"+id)
        .then((res)=>{
            console.log(res)
            setSearchBook(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const contains = (text,book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const textSearch = text.toLowerCase();
        if(title.includes(textSearch) || author.includes(textSearch)){
            return true;
        }
        return false;
    }
      

    const handleSearch = text => {
        const dataBook = publicBooks.filter(book => {
          return contains(text,book)
        })
        console.log(dataBook)
        //setPublicBooks(dataBook)
        if(dataBook){
            setRenderBook(dataBook)
        }
        else{
            setRenderBook(publicBooks);
        }
      }

    return(
        
        <View>
            <Button title="Logout"/>

            <Input
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => handleSearch(text)}
                status='info'
                placeholder='Search'
                textStyle={{ color: '#000' }}
            />

            <Text>Recommandation</Text>

            <View>
                <FlatList
                    style={styles.flatlist}
                    data={renderBook}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                style={{
                                    width:260,
                                    height:300,
                                    borderWidth:2,
                                    resizeMode:'contain',
                                    margin:8
                                }}
                                source={{
                                uri: noImage,
                                }}
                            />
                            <Text>{item.author}</Text>
                            <Text>{item.title}</Text>
                            <Text>-------</Text>
                        </View>
                    )}
                />
            </View>


            
            
            
        </View>
    )
}



const styles = StyleSheet.create({
    flatlist: {
        flexDirection: 'column',
     },
    containerGrid:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    itemGrid:{
        flexGrow: 1,
    }
  });