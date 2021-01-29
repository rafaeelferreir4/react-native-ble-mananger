#include <WiFi.h>
#include <FirebaseESP32.h>

//1. Change the following info
#define  WIFI_SSID "TP-Link_500B"
#define  WIFI_PASSWORD "06082305"
#define  FIREBASE_HOST "esp32-firebase-40cfc-default-rtdb.firebaseio.com"
#define  FIREBASE_AUTH "WhnTUzbv4Z28DrriLp0tH851WPvwkCgGEsPTDzkP"

//2. Define FirebaseESP8266 data object for data sending and receiving
FirebaseData fbdo;


void setup()
{

  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();


  //3. Set your Firebase info

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  //4. Enable auto reconnect the WiFi when connection lost
  Firebase.reconnectWiFi(true);

  if(Firebase.getString(fbdo, "/test"))
  {
    //Success
    Serial.print("Get string data success, string = ");
    Serial.println(fbdo.stringData());

  }else{
    //Failed?, get the error reason from fbdo

    Serial.print("Error in getInt, ");
    Serial.println(fbdo.errorReason());
  }


}

void loop()
{
}