# 🌱 Projeto Estufa Inteligente

Sistema desenvolvido para monitorar e controlar uma estufa utilizando **ESP32**, sensores, comunicação **MQTT**, uma **API em Node.js** e uma interface web desenvolvida em **React**.

O objetivo do projeto é acompanhar as condições da estufa em tempo real e utilizar os dados dos sensores para auxiliar no controle do ambiente.

---

## 🌿 Sobre o projeto

A Estufa Inteligente foi desenvolvida para realizar o monitoramento de diferentes condições do ambiente.

O sistema utiliza sensores conectados ao ESP32 para coletar informações e enviar os dados por meio do protocolo MQTT.

Essas informações são recebidas pela API e exibidas em uma aplicação web, facilitando o acompanhamento do funcionamento da estufa.

---

## ⚙️ Funcionalidades

O projeto realiza o monitoramento de:

- 🌱 Umidade do solo
- 💧 Umidade do ar
- 🌡️ Temperatura
- 🌧️ Presença de chuva
- 🏠 Estado do teto da estufa
- 📡 Comunicação MQTT

Além disso, o projeto possui um **servo motor responsável pela movimentação do teto da estufa**.

---

## 🧠 Funcionamento

O funcionamento geral do sistema acontece da seguinte forma:

```text
Sensores
   ↓
ESP32
   ↓
MQTT
   ↓
API Node.js
   ↓
Frontend React
   ↓
Painel de Monitoramento
