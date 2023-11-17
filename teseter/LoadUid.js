import { StyleSheet, Text, View}from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from './../firebase/firebaseconfig';
import { getFirestore, collection, getDocs, query, where, onSnapshot, docs } from "firebase/firestore";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [users, setusers] = useState([]);

  //test@naver.com
  //12341234
  const loginUser = async () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then(()=> console.log('logged in'))

    const docsRef = collection(db,'users');
    const q = query(docsRef, where('Uid', '!=', authentication?.currentUser?.uid));
    const docsSnap = onSnapshot(q, (onSnap) => {
      let data = [];
      onSnap.docs.forEach(user => {
        data.push({...user.data()})
        setusers(data)
        console.log(user.data())
      })
    })
  }
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if(user){
        loginUser
        setusers(users)
      }
      else{
        console.log('no user')
      }
    })
  }, [])

  return(
    <View style = {styles.container}>
            <Input
                placeholder='Enter email'
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                leftIcon={{type: 'material', name: 'email'}}
                />
            <Input
                placeholder='Enter pass'
                label='pass'
                value={password}
                onChangeText={text => setpassword(text)}
                leftIcon={{type: 'material', name: 'lock'}}
                />
                <Button
                style={styles.btn}
                title='Login'
                onPress={loginUser}
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