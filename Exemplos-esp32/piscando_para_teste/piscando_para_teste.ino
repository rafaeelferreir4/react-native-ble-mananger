void setup() 
{
 pinMode(2, OUTPUT);
     
}

void loop() 
{
  digitalWrite(2, HIGH);   // LED Liga
  delay(100);             // Espera 1 segundo
  digitalWrite(2, LOW);    // LED Desliga
  delay(1000);             // Espera 1 segundo
}
