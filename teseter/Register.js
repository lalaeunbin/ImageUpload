import { StyleSheet, Text, View } from "react-native";
import React, { useReducer, useState } from "react";
import { Input, Button, Avatar } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [Name, setUsername] = useState('');
        const [avater, setAvater] = useState('');

        const registerUser = async () => {
        createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => {
            const userUID = userCredentials.user.uid;
            const docRef = doc(db, 'users', userUID);
            const docSnap = setDoc(docRef, {
                avaterUrl: avater? avater: 'https://cdn-icons-png.flaticon.com/512/7542/7542670.png',
                Name,
                password,
                UID,
                email,
            })
        })
        .then(() => console.log('succesful'))
        }

    return(
        <view style = {styles.container}>
            <Input
                placeholder='username'
                label='username'
                value={username}
                onChangeText={text => setUsername(text)}
                leftIcon={{type: 'material', name: 'account-circle'}}
                />
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
                onChangeText={text => setPassword(text)}
                leftIcon={{type: 'material', name: 'lock'}}
                secureTextEntry
                />
            <Input
                placeholder='Avater url'
                label='Avater'
                value={avater}
                onChangeText={text => setAvater(text)}
                leftIcon={{type: 'material', name: 'link'}}
                />
 
                <Button
                onPress={registerUser}
                style={styles.btn}
                title='SignIn'
                />
        </view>
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