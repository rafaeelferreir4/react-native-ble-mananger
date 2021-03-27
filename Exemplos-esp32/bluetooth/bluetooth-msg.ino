#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLECharacteristic *pCharacteristic;
BLECharacteristic *characteristicTX; //através desse objeto iremos enviar dados para o client

bool deviceConnected = false;
float txValue = 0;
const int readPin = 32; // Use GPIO number. See ESP32 board pinouts
const int LED = 2; // Could be different depending on the dev board. I used the DOIT ESP32 dev board.

//std::string rxValue; // Could also make this a global var to access it in loop()

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};


void setup() {
  Serial.begin(115200);

  pinMode(LED, OUTPUT);

  // Create the BLE Device
  BLEDevice::init("ESP32 test"); // Give it a name

  // Create the BLE Server
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);


  characteristicTX = pService->createCharacteristic(
                       CHARACTERISTIC_UUID_TX,
                       BLECharacteristic::PROPERTY_NOTIFY
                     );

    characteristicTX->addDescriptor(new BLE2902());
  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
}

void loop() {
  if (deviceConnected) {
    digitalWrite(LED, HIGH);   // LED Liga
    int recado = 10;
    characteristicTX->setValue("recado"); //seta o valor que a caracteristica notificará (enviar) 
            
    characteristicTX->notify(); // Envia o valor para o smartphone
  } else {
    digitalWrite(LED, HIGH);    // LED liga
    delay(1000);
    digitalWrite(LED, LOW);    // LED Desliga
    }
  delay(1000);
}
