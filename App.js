import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import BleManager from 'react-native-ble-manager';
import database from '@react-native-firebase/database';

import style from './style';
const id = '24:62:ab:dc:d8:fe';

export default function App() {
  const [mensagem, setMensagem] = useState('a');

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
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      for (let i of peripheralsArray) {
        console.log('=====================================');
        console.log(i);
      }
    });
  }

  function readDatabase() {
    database()
      .ref('/')
      .once('value')
      .then((snapshot) => {
        setMensagem(snapshot.val());
      });
  }
  return (
    <ScrollView>
      <Text onPress={() => conectar()}>Ligar O bluetooth</Text>
      <Text onPress={() => disconectar()}>deslifar O bluetooth</Text>
      <Text onPress={() => scan()}>SCANs</Text>
      <Text onPress={() => readDatabase()}>Banco</Text>
      <Text style={style.msg}>{mensagem}</Text>
    </ScrollView>
  );
}
