#include <ESP32Servo.h>

//Referenciando as bibliotecas externas que serão utilizadas
#include "DHT.h"   //#include é incluindo a biblioteca
#include "Adafruit_Sensor.h"    //é necessario por o nome da biblioteca para incluir a biblioteca

//incluindo as bibliotecas para o projeto
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

int pinoLED1 = 2;

int pinoLED2 = 15;

int pinoServo = 18;

int pinoDHT = 4;

int pinoChuva = 5;

//garantindo a conexão com o wifi
String nome_wifi = "SALA08";

String senha = "123456789";

//cria objeto que controlara o motor
Servo meuServo;

//Criando objeto para utilizar as funçoes da biblioteca

//Quando passar para o arduino IDE, alterar para DHT11
DHT sensor_dht(pinoDHT, DHT11); //(variavel do DHT, tipo de DHT);

//criando um objeto para conectar de forma segura com o broker
WiFiClientSecure espClient;

PubSubClient MQTT(espClient);

char *broker = "1fc6157e6caf4d6b86e34770d9f83882.s1.eu.hivemq.cloud";

LiquidCrystal_I2C lcd(0x27, 16, 2);

void conectarWifi();

void conectarMqtt();

void setup() {

  // Define os dois LEDs como saída
  pinMode(pinoLED1, OUTPUT);

  pinMode(pinoLED2, OUTPUT);

  pinMode(pinoChuva, INPUT);

  //inicia o motor de acordo com o pino
  meuServo.attach(pinoServo);

  Serial.begin(9600);

  Serial.println("Sistema Estufa");

  sensor_dht.begin();

  conectarWifi();

  espClient.setInsecure();

  MQTT.setServer(broker, 8883);

  Wire.begin(22, 19);

  lcd.init();

  lcd.backlight();

  lcd.setCursor(0, 0);

  lcd.print("Sistema Estufa");

  lcd.setCursor(0, 1);

  lcd.print("Inicializando");

  delay(2000);
}

void loop() {

  if (MQTT.connected() == false) {

    conectarMqtt();
  }

  MQTT.loop();

  //Lendo a temperatura em °C e armaazenando na variavel
  float tempo = sensor_dht.readTemperature(); //declarando a variavel tipo FLOAT (numeros quebrados) para a temperatura

  //lendo a umidade do ar em % e armazenando na variavel com o nome do que vc quer
  float umidade = sensor_dht.readHumidity(); //declarando a variavel tipo FLOAT (numeros quebrados) para a temperatura

  Serial.print(" Temp: " + String(tempo) + "°C");

  Serial.print(" Umidy: " + String(umidade) + "%");

  Serial.println();

  int estadoChuva = digitalRead(pinoChuva);

  if (estadoChuva == HIGH) {

    meuServo.write(180);

    digitalWrite(pinoLED1, HIGH);

    digitalWrite(pinoLED2, LOW);

    lcd.clear();

    lcd.setCursor(0, 0);

    lcd.print("Clima: Chuvoso");

    lcd.setCursor(0, 1);

    lcd.print("Cobert: Aberta");

  } else {

    meuServo.write(0);

    digitalWrite(pinoLED1, LOW);

    digitalWrite(pinoLED2, HIGH);

    lcd.clear();

    lcd.setCursor(0, 0);

    lcd.print("Clima: Sem chuva");

    lcd.setCursor(0, 1);

    lcd.print("Cobert: Fechada");
  }

  delay(2000);
}

//function para realizar a conexão com o wifi
void conectarWifi() {

  WiFi.begin(nome_wifi, senha);

  while (WiFi.status() != WL_CONNECTED) {

    Serial.print(".");

    delay(500);
  }

  Serial.print("Wifi Conectado!");

  Serial.println(WiFi.localIP());
}

//processo para conectar
void conectarMqtt() {

  Serial.print("Conectando com o MQTT.....");

  if (MQTT.connect(
        "enviar",
        "ricardodias",
        "TesteSenai1"
      )) {

    Serial.println("Conectado ao MQTT");

  } else {

    Serial.println("Erro ao conectar");
  }
}
