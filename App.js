import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home'
import LoadUid from './teseter/LoadUid'
import ItemLoad from './teseter/ItemLoad'

export default function App() {
  return (
    <ItemLoad/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      width: 400,
      height: 300,
      resizeMode: 'contain',
      borderRadius: 50
  },
  text: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20
  }
});
