import { Text, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SvgComponent from '../assets/SVG';

export default function EmptyState() {
    return (
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <SvgComponent />
            <Text style={{color: "gray", margin: 20}}>
                사진 업로드
            </Text>
        </View>
    );
}