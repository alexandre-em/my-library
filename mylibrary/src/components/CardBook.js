import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Button, Card, Paragraph, Dialog, Portal } from 'react-native-paper';
import { getContentByID, getId } from 'services';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { bookRead } from 'services/users';

export default function CardBook(props) {
    const { title, author, image, id } = props.item
    const auth = useSelector((state) => state.auth);
    const type = props.type
    const noImage = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
    const windowHeight = Dimensions.get('window').height;

    const [visible, setVisible] = useState(false);

    const manageDialog = () => setVisible(prevState => !prevState);
    
  
    const [annee,setAnnee] = useState("")
    const [langue,setLangue] = useState("")
    const [content,setContent] = useState("")

    
    useEffect(() => {
      descriptionBook(id)
    }, []);

    const getContent = (id) =>{
      if(auth.isAuthenticated){
        getContentByID(auth.accessToken, id)
        .then((res)=>{
          setContent(res.data.booksContent)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }

    const openDialog = (id) =>{
        affichageDonnees(id);
        manageDialog();
        getContent(id); 
        if(auth.isAuthenticated){
          const token = jwt_decode(auth.accessToken);
          bookRead(token.sub,id, auth.accessToken).then((res)=>{
            
          })
          .catch((err)=>{
            console.log(err)
          });
        }
    }

    const descriptionBook = (id) => {
      getId(id)
      .then((res)=>{
          setAnnee(res.data.year)
          setLangue(res.data.language)
        })
      .catch((err)=>{
        console.log(err)
      })
    }

    return (
        <>
        {
        type==="profilCard" ? <>
          <Card style={{width:200, margin:10}}>
            <Card.Cover source={{uri:image?image:noImage}} />
            <Card.Title style={{textOverflow: 'ellipsis',overflow: 'hidden' }}title={title} subtitle={author} />
            <Card.Content>
              <Paragraph>Année : {annee}</Paragraph>
              <Paragraph>Langue : {langue}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => openDialog(id)}>View more</Button>
              
              </Card.Actions>
          </Card>
          
        </> :
          <Card style={{width:200, margin:10}}>
              <Card.Cover source={{uri:image?image:noImage}} />
              <Card.Title style={{textOverflow: 'ellipsis',overflow: 'hidden' }}title={title} subtitle={author} />
              <Card.Actions>
              <Button onPress={() => openDialog(id)}>View more</Button>
              
              </Card.Actions>
          </Card>
          }
        
        <Portal>
          <Dialog visible={visible} onDismiss={manageDialog} style={{height:windowHeight}}>
            <Dialog.Title>{title}</Dialog.Title>
            {auth.isAuthenticated ?<>
              <Dialog.ScrollArea>
                <ScrollView>
                  <Paragraph>
                  {content}
                  </Paragraph>
                </ScrollView>
              </Dialog.ScrollArea>
            </> :<Dialog.ScrollArea>
                  <Paragraph>
                  Vous n'êtes pas connecté
                  </Paragraph>
                
                </Dialog.ScrollArea>}
              
            <Dialog.Actions>
              <Button onPress={() => manageDialog()}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </>
        
    );
}