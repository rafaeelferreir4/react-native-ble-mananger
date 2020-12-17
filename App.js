import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import BleManager from 'react-native-ble-manager';
import database from '@react-native-firebase/database';

import style from './style';
const id = '24:62:AB:DC:D8:FE';

export default function App() {
  const [mensagem, setMensagem] = useState('a');
  const [arrayId, setArrayId] = useState([]);
  const [arrayLocal, setArrayLocal] = useState([]);
  useEffect(() => {
    setInterval(10000);
    readDatabase();
    for (let i = 0; i < arrayId.length; i++) {
      BleManager.connect(arrayId[i])
        .then(() => {
          setMensagem('Você está em:' + arrayLocal[i]);
        })
        .catch((error) => {
          // Failure code
          // console.log(error);
        });
    }
  });
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
      .ref('/id')
      .once('value')
      .then((snapshot) => {
        setArrayId(snapshot.val().split(','));
      });
    database()
      .ref('/local')
      .once('value')
      .then((snapshot) => {
        setArrayLocal(snapshot.val().split(','));
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
