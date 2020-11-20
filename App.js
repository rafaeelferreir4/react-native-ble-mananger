import React from 'react';
import { ScrollView, Text,  } from 'react-native';
import { enableBluetooth,  } from 'react-native-ble-manager'
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function App () {

  function startble () {
    alert('teste')
    enableBluetooth().then(() => {
      // Success code
      alert("Scan started");
    });
  }
  return (
    <ScrollView>
      <Text onPress={() => startble()} style={{ fontSize: 80 }}>Ligar bluetooth</Text>
    </ScrollView>
  );
}
