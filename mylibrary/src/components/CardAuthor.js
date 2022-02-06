import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, Text, View  } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Dialog, Portal } from 'react-native-paper';
import noImage from 'assets/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
import { getContentByID, getId } from 'services';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { bookRead } from 'services/users';
import { getAuthorDetails } from 'services/authors';

export default function CardAuthor(props) {
    const { name, id } = props.item
    const auth = useSelector((state) => state.auth);

    const [authorsBooks, setAuthorsBooks] = useState([]);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [visible, setVisible] = useState(false);

    const manageDialog = () => setVisible(prevState => !prevState);

    const authorDetails = () =>{
        getAuthorDetails(id)
        .then((res)=>{
            setAuthorsBooks(res.data.books);
          })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    useEffect(() => {
        authorDetails();
    }, []);

   


    

    return (
        <>
            <Card key={id} style={{width:300, margin:10}}>
                
                <Card.Title style={{textOverflow: 'ellipsis',overflow: 'hidden' }} title={name} />
                <Card.Actions>
                    <Button onPress={() => {
                            manageDialog();
                    }}>View more</Button>
                </Card.Actions>
            </Card>

            <Portal>
                <Dialog visible={visible} onDismiss={manageDialog} style={{height:windowHeight}}>
                <Dialog.ScrollArea>
                    <ScrollView>
                    {authorsBooks.map(book =><View key={book.id}>
                        <Dialog.Title>{book.title}</Dialog.Title>
                        <Text>Date de publication: {book.year}</Text> 
                        
                    </View>)}
                        
                    </ScrollView>
                </Dialog.ScrollArea>
                    
                    <Dialog.Actions>
                        <Button onPress={() => manageDialog()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
        </>
        
    );
}