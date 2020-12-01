
int LED = 2;
 
void setup() {
 pinMode(LED, OUTPUT);
 pinMode(T0, INPUT);
}
 
void loop() {
 if (touchRead(T0) < 20) {
  digitalWrite(LED, HIGH);
 } else {
  digitalWrite(LED, LOW);
 }
delay(100);
}
