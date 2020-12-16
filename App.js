import React from 'react';
import {ScrollView, Text} from 'react-native';
import BleManager from 'react-native-ble-manager';

const id = '24:62:ab:dc:d8:fe';
export default function App() {
  function conectar() {
    BleManager.connect(id)
      .then(() => {
        // Success code
        console.log('Connected');
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }
  function disconectar() {
    BleManager.disconnect(id)
      .then(() => {
        console.log('Disconnected');
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }
  function scan() {
    console.log('foi');
    BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
      for (let i of peripheralsArray) {
        console.log('=====================================');
        console.log(i);
      }
    });
  }
  return (
    <ScrollView>
      <Text onPress={() => conectar()}>Ligar O bluetooth</Text>
      <Text onPress={() => disconectar()}>deslifar O bluetooth</Text>
      <Text onPress={() => scan()}>SCANs</Text>
    </ScrollView>
  );
}
