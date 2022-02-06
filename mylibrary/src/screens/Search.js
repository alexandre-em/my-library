import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar, Button } from 'react-native-paper';
import { publicSearch, userSearch } from 'services';
import CardBook from 'components/CardBook';
import { Picker } from '@react-native-picker/picker';

export default function Search() {

    const auth = useSelector((state) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [publicBooks, setPublicBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedValue, setSelectedValue] = useState("DEFAULT");
    const onChangeSearch = query => setSearchQuery(query);

    const changePage = (nb) =>{
        if((nb+page < totalPage) && (page+nb >=0)){
            if(auth.isAuthenticated){
                userSearch(searchQuery, auth.accessToken, selectedValue, nb+page)
                .then((res)=>{
                    setPage(nb+page);
                    setPublicBooks(res.data.data);
                }).catch((err)=>(console.log(err)))
            }
            else{
                publicSearch(searchQuery, selectedValue, nb+page)
                .then((res)=>{
                    setPage(nb+page);
                    setPublicBooks(res.data.data);
                }).catch((err)=>(console.log(err)))
            }
        }
        
    }

    const searchBook = () =>{
        setPage(0)
        if(auth.isAuthenticated){
            userSearch(searchQuery, auth.accessToken, selectedValue, 0)
            .then((res)=>{
                
                setPublicBooks(res.data.data);
                setTotalPage(res.data.totalPage)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else{
            publicSearch(searchQuery, selectedValue, 0)
            .then((res)=>{
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
                style={{margin:10}}
            />
            <View>
                <Text style={{marginLeft:10}}>Option de recherche</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={{marginLeft:10}}
                >
                    <Picker.Item label="Default" value="DEFAULT" />
                    <Picker.Item label="Title" value="TITLE" />
                    <Picker.Item label="Author" value="AUTHOR" />
                    <Picker.Item label="Year" value="YEAR" />
                    <Picker.Item label="Regex" value="REGEX" />
                </Picker>
            </View>
            

            <View style={styles.containerCard}>
                {publicBooks.map(item=>
                    <CardBook key={item.id} item = {item}></CardBook>
                )}
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