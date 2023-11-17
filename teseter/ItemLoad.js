import { StyleSheet, Text, View}from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from './../firebase/firebaseconfig';
import { getFirestore, collection, getDocs, query, where, onSnapshot, docs } from "firebase/firestore";


export default function Login() {
  const [Itemid, setItemUid] = useState('');
  const [items, setitems] = useState([]);

  //test@naver.com
  //12341234
  const FindItem = async () => {
    signInWithEmailAndPassword(authentication, Itemid)
    .then(()=> console.log('finded'))

    const docsRef = collection(db,'items');
    const q = query(docsRef, where('Itemid', '!=', authentication?.currentUser?.uid));
    const docsSnap = onSnapshot(q, (onSnap) => {
      let data = [];
      onSnap.docs.forEach(item => {
        data.push({...item.data()})
        setitems(data)
        console.log(item.data())
      })
    })
  }
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if(item){
        FindItem
        setitems(items)
      }
      else{
        console.log('no user')
      }
    })
  }, [])

  return(
    <View style = {styles.container}>
            <Input
                placeholder='Item Uid'
                label='Item Uid'
                value={Itemid}
                onChangeText={text => setItemUid(text)}
                leftIcon={{type: 'material', name: 'email'}}
                />
                <Button
                style={styles.btn}
                title='Find'
                onPress={FindItem}
                />
    </View>
  )
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
btn:{
  marginTop: 10
}
});