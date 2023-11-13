import {
    Image,
    Text,
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
  } from "react-native";
import { StatusBar } from 'expo-status-bar';
import SvgComponent from '../assets/SVG';
import EmptyState from '../components/EmptyState';
import ProgressBar from '../components/ProgressBar';
//import { Uploading } from '../components/Uploading';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Video } from 'expo-av';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { addDoc, collection, onSnapshot} from 'firebase/firestore';
import { storage } from '../firebase/firebaseconfig'


export default function Home() {
    const [image, setImage] = useState("");
    const [Video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        })

        if(!result.canceled) {
            setImage(result.assets[0].uri);
            // Upload the image
            await uploadImage(result.assets[0].uri, "image");
        }
    }

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();
        
        const storageRef = ref(storage, "Stuff/" + new Date().getTime())
        const uploadTask = uploadBytesResumable(storageRef, blob)

        uploadTask.on("state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is" + progress + "% done");
            setProgress(progress.toFixed())

        },
        (error) => {

        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("File available at", downloadURL);
                setImage("")
                setVideo("")
            })
        }
        )
    }

    return (
        
        <View style={{ flex:1,  alignItems: "center", justifyContent: "center"}}>
            <EmptyState />
            <TouchableOpacity
                onPress={pickImage}
                style={{
                    position:"absolute",
                    bottom: 90,
                    right: 30,
                    width: 44,
                    height: 44,
                    backgroundColor: "purple",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                }}
                >
                    <Ionicons name="image" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                // onPress={pickImage}
                style={{
                    position:"absolute",
                    bottom: 150,
                    right: 30,
                    width: 44,
                    height: 44,
                    backgroundColor: "purple",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                }}
                >
                    <Ionicons name="videocam" size={24} color="white" />
                </TouchableOpacity>
        </View>
    );
}

/*
<Uploading />

{image && <Uploading image={image} Video={Video} progress={progress} />}
            <ProgressBar progress={60} />
*/