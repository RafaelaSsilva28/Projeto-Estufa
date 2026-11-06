 <div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=230&color=0:581C87,35:9333EA,70:D946A5,100:F9A8D4&text=Estufa%20Inteligente&fontSize=48&fontColor=FFFFFF&fontAlignY=38&desc=Monitoramento%20ambiental%20%E2%80%A2%20Automa%C3%A7%C3%A3o%20%E2%80%A2%20RFID&descAlignY=60&descSize=15&animation=fadeIn&section=header" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=500&size=18&duration=3000&pause=1000&color=D879C5&center=true&vCenter=true&width=650&lines=Tecnologia+conectada+%C3%A0+natureza;Sensores%2C+automa%C3%A7%C3%A3o+e+monitoramento;Uma+estufa+mais+inteligente!" />

<br/>

Uma maquete conectada que integra sensores, controle da cobertura  
e uma interface web para acompanhar as condições da estufa.

<br/>

![ESP32](https://img.shields.io/badge/ESP32-Controle_embarcado-831843?style=for-the-badge)
![MQTT](https://img.shields.io/badge/MQTT-Comunicação-a855f7?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-API-db2777?style=for-the-badge)
![React](https://img.shields.io/badge/React-Interface_web-9333ea?style=for-the-badge)

<br/>

**🌡️ Temperatura &nbsp; • &nbsp; 💧 Umidade &nbsp; • &nbsp; 🌧️ Chuva**

**🚶 Presença &nbsp; • &nbsp; 🪪 RFID &nbsp; • &nbsp; 🏠 Cobertura automática**

</div>

---

## 🌿 Conheça o projeto

A **Estufa Inteligente** reúne eletrônica e desenvolvimento de sistemas em uma maquete de estufa com cobertura móvel.

O **ESP32** realiza a leitura dos sensores, controla o servo motor, atualiza os displays e publica informações por **MQTT**. A proposta de integração utiliza uma **API em Node.js** e um **frontend em React** para apresentar os dados em um painel de monitoramento.

O sistema também identifica cartões **RFID** e apresenta no **OLED** um símbolo indicando se o cartão foi permitido ou negado.

> 🌷 **Objetivo do projeto:** demonstrar a integração entre sensores, automação, comunicação e interface web, permitindo acompanhar as condições da estufa e o funcionamento dos componentes.

---

## ✨ Recursos do sistema

| | Recurso | Funcionamento |
|:--:|:--|:--|
| 🌡️ | **Temperatura** | Leitura da temperatura ambiente pelo DHT. |
| 💧 | **Umidade do ar** | Leitura da umidade relativa do ambiente pelo DHT. |
| 🌧️ | **Detecção de chuva** | Leitura analógica e classificação conforme o limite configurado. |
| 🚶 | **Detecção de presença** | Identificação de movimento pelo sensor PIR. |
| 🪪 | **Identificação RFID** | Comparação do UID do cartão com o UID autorizado. |
| 🏠 | **Cobertura móvel** | Movimentação do telhado por servo motor. |
| 📟 | **LCD 16×2** | Exibição da umidade do ar e do estado do telhado. |
| 🖥️ | **OLED** | Exibição de ✓ para acesso permitido e X para acesso negado. |
| 📡 | **MQTT** | Publicação das leituras e dos estados do sistema. |

---

## 🔗 Integração do projeto

A Estufa Inteligente conecta três partes principais: **simulação do circuito, processamento das informações e interface de monitoramento**.

<div align="center">

### 🌷 Explore o projeto

<a href="https://wokwi.com/projects/473531629478178817">
  <img src="https://img.shields.io/badge/🔌_ABRIR_SIMULAÇÃO_WOKWI-9333EA?style=for-the-badge&logoColor=white" />
</a>

<a href="https://projeto-estufa-frontend.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_ACESSAR_SITE-DB2777?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<br/>

<sub>Simule o circuito e conheça a interface web do projeto.</sub>

</div>

### 🧩 Como as partes se conectam

```mermaid
flowchart TB
    subgraph CIRCUITO["🌱 01 · MONITORAMENTO E AUTOMAÇÃO"]
        direction LR
        A["🌡️ DHT"]
        B["🌧️ Chuva"]
        C["🚶 PIR"]
        D["🪪 RFID"]
        A --> ESP["ESP32"]
        B --> ESP
        C --> ESP
        D --> ESP
        ESP --> SERVO["🏠 Servo motor"]
        ESP --> DISPLAY["📟 LCD / OLED"]
    end

    subgraph COMUNICACAO["📡 02 · COMUNICAÇÃO"]
        direction LR
        MQTT["MQTT"]
        BROKER["☁️ HiveMQ Cloud"]
        MQTT --> BROKER
    end

    subgraph APLICACAO["💻 03 · APLICAÇÃO"]
        direction LR
        API["⚙️ Backend Node.js"]
        WEB["🌷 Frontend React"]
        API --> WEB
    end

    ESP --> MQTT
    BROKER --> API

    style CIRCUITO fill:#FCE7F3,stroke:#DB2777,color:#831843
    style COMUNICACAO fill:#F3E8FF,stroke:#9333EA,color:#581C87
    style APLICACAO fill:#FCE7F3,stroke:#D946A5,color:#831843
    style ESP fill:#9333EA,color:#FFFFFF,stroke:#581C87
    style BROKER fill:#A855F7,color:#FFFFFF,stroke:#6B21A8
    style WEB fill:#DB2777,color:#FFFFFF,stroke:#9D174D
```

### ⚙️ Etapas de funcionamento

<table>
<tr>
<td align="center" width="50%">
<h3>01 · 🌡️ Coleta</h3>
Os sensores identificam as condições do ambiente, como temperatura, umidade, chuva e presença.
</td>
<td align="center" width="50%">
<h3>02 · 🧠 Processamento</h3>
O ESP32 interpreta as informações e executa as ações programadas.
</td>
</tr>
<tr>
<td align="center" width="50%">
<h3>03 · 🏠 Automação</h3>
O servo motor movimenta a cobertura e os displays apresentam os estados do sistema.
</td>
<td align="center" width="50%">
<h3>04 · 📡 Comunicação</h3>
As informações são publicadas nos tópicos MQTT para comunicação entre os componentes.
</td>
</tr>
<tr>
<td align="center" width="50%">
<h3>05 · ⚙️ Integração</h3>
A estrutura de backend organiza as informações recebidas para disponibilizá-las à aplicação.
</td>
<td align="center" width="50%">
<h3>06 · 💻 Visualização</h3>
A interface web apresenta os dados do monitoramento em páginas próprias.
</td>
</tr>
</table>

### 🖥️ Ambientes do projeto

<div align="center">

| <a href="https://wokwi.com/projects/473531629478178817">🔌 Simulação Wokwi</a> | <a href="https://projeto-estufa-frontend.vercel.app/">🌐 Aplicação Web</a> |
|:--:|:--:|
| <img src="https://img.shields.io/badge/CIRCUITO-ESP32-9333EA?style=for-the-badge" /> | <img src="https://img.shields.io/badge/INTERFACE-REACT-DB2777?style=for-the-badge" /> |
| Simulação dos componentes e conexões do circuito. | Interface web para acompanhar o projeto. |

</div>

---

## 🌸 Sensores e componentes

### 🌡️ DHT — temperatura e umidade

Responsável por medir a **temperatura** e a **umidade do ar**.

- O código enviado está configurado para **DHT22**.
- Para o circuito físico com **DHT11**, o modelo deve ser alterado no programa.
- As leituras são realizadas em intervalos de **2 segundos**.
- Leituras inválidas geram uma mensagem no Monitor Serial.
- Valores diferentes da leitura anterior são publicados por MQTT.

### 🌧️ Sensor de chuva — controle da cobertura

O ESP32 realiza uma leitura analógica e compara o resultado com o limite **2000**.

| Condição no código atual | Classificação | Cobertura | Servo |
|:--|:--|:--|:--|
| Leitura maior ou igual a `2000` | Chuvoso | Aberta | `180°` |
| Leitura menor que `2000` | Sem chuva | Fechada | `0°` |

> Essa é a lógica implementada no código enviado. O limite e o sentido da leitura devem ser conferidos nos testes com o sensor físico.

### 🚶 PIR — detecção de presença

O sensor informa se há movimento detectado.

- **HIGH:** publica `Presenca detectada`.
- **LOW:** publica `Sem presenca`.
- A publicação acontece quando o estado muda.

### 🪪 RFID — identificação de cartões

O leitor **MFRC522** identifica o UID do cartão apresentado e compara com o UID autorizado.

| Resultado | OLED | Mensagem MQTT |
|:--|:--:|:--|
| UID autorizado | ✓ | `Permitido` |
| UID diferente | X | `Negado` |

O símbolo permanece no OLED por **2 segundos**. Em seguida, a tela é limpa.

A identificação indica o resultado da leitura; o código atual não aciona uma fechadura.

---

## 📟 Informações no circuito

### LCD 16×2 I2C

Exibe as informações da estufa:

- Umidade do ar em porcentagem.
- Estado do telhado: aberto ou fechado.

Endereço I2C: `0x27`.

### OLED SSD1306

Exibe o resultado da identificação RFID:

- ✓ — acesso permitido.
- X — acesso negado.

Resolução: **128 × 64**.  
Endereço I2C: `0x3C`.

---

## 🔌 Pinagem do código enviado

| Componente | Sinal | GPIO do ESP32 |
|:--|:--|:--:|
| DHT | Dados | `4` |
| Sensor de chuva | Saída analógica | `34` |
| Servo motor | Sinal de controle | `13` |
| PIR | Saída digital | `15` |
| LCD | SDA | `21` |
| LCD | SCL | `22` |
| OLED | SDA | `26` |
| OLED | SCL | `27` |
| RFID MFRC522 | SDA / SS | `5` |
| RFID MFRC522 | RST | `17` |
| RFID MFRC522 | SCK | `18` |
| RFID MFRC522 | MISO | `19` |
| RFID MFRC522 | MOSI | `23` |

**LCD e OLED utilizam barramentos I2C separados nesta versão.**  
No leitor RFID, o pino identificado como SDA é utilizado como seleção SPI — SS.

---

## 📡 Comunicação MQTT

O programa utiliza **HiveMQ Cloud**, com conexão na porta **8883**.

As mensagens são publicadas com a opção **retained**, permitindo que o broker mantenha a última mensagem de cada tópico.

| Tópico | Conteúdo publicado |
|:--|:--|
| `aula/27/temperatura` | Temperatura com uma casa decimal. |
| `aula/27/umidadeAr` | Umidade do ar com uma casa decimal. |
| `aula/27/statusChuva` | `Chuvoso` ou `Sem chuva`. |
| `aula/27/cobertura` | `Aberta` ou `Fechada`. |
| `aula/27/presencaPir` | `Presenca detectada` ou `Sem presenca`. |
| `aula/27/acessoRfid` | `Permitido` ou `Negado`. |

> As credenciais de conexão devem ser configuradas no ambiente de desenvolvimento e não incluídas neste README.

---

## 💻 Interface web

A aplicação utiliza **React**, navegação com **React Router**, estilização com **Tailwind CSS** e ícones do **React Icons**.

A identidade visual combina **rosa e roxo**, com menu lateral e adaptação para telas menores.

<div align="center">

<a href="https://projeto-estufa-frontend.vercel.app/">
  <img src="https://img.shields.io/badge/🌷_VISITAR_ESTUFA_INTELIGENTE-D946A5?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

</div>

| Página | Descrição |
|:--|:--|
| 🏡 **Início** | Apresentação do projeto. |
| 📊 **Painel de Controle** | Visão geral do monitoramento. |
| 🌡️ **Temperatura** | Acompanhamento da temperatura ambiente. |
| 💧 **Umidade do ar** | Visualização da umidade relativa do ar. |
| 🌧️ **Chuva** | Informações sobre chuva e cobertura. |
| 🚶 **Movimento** | Indicação de presença detectada. |

---

## 🧰 Tecnologias e bibliotecas

| Área | Tecnologias |
|:--|:--|
| **Microcontrolador** | ESP32 |
| **Programação embarcada** | C++ e Arduino IDE |
| **Comunicação** | Wi-Fi e MQTT |
| **Broker** | HiveMQ Cloud |
| **Backend** | Node.js |
| **Frontend** | React e React Router |
| **Estilização** | Tailwind CSS e React Icons |
| **Simulação** | Wokwi |

### Bibliotecas do circuito

- `ESP32Servo`
- `DHT sensor library`
- `Adafruit Unified Sensor`
- `PubSubClient`
- `LiquidCrystal_I2C`
- `Adafruit GFX Library`
- `Adafruit SSD1306`
- `MFRC522`

O código também utiliza `WiFi`, `WiFiClientSecure`, `Wire` e `SPI`, disponíveis no pacote de suporte do ESP32.

---

## 🧪 Preparação para os testes

1. Configure a placa **ESP32 Dev Module** no Arduino IDE.
2. Instale as bibliotecas utilizadas pelo programa.
3. Confira a pinagem correspondente à versão do circuito.
4. Selecione o modelo correto do DHT.
5. Configure a rede Wi-Fi e os dados de conexão MQTT.
6. Ajuste o UID autorizado para o cartão utilizado.
7. Envie o programa para a placa.
8. Abra o **Monitor Serial em 115200 baud**.

A rede `Wokwi-GUEST` é utilizada na simulação. No circuito físico, configure a rede disponível no local.

---

## 👩‍💻 Equipe

<div align="center">

### Rafaela & Susany

**Análise e Desenvolvimento de Sistemas — SENAI**  
Turma **3º B** · Professor **Ricardo Dias**

</div>

---

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=500&size=20&duration=3000&pause=1000&color=D879C5&center=true&vCenter=true&width=550&lines=Tecnologia+que+conecta+e+transforma;Inovação+em+cada+detalhe!;Cultivando+ideias+com+tecnologia+%F0%9F%8C%B7" />

### 🌷 Estufa Inteligente

**Do sensor à interface, cada leitura conta uma parte do ambiente.**

Projeto educacional desenvolvido com tecnologia, criatividade e inovação.

<br/>

![ESP32](https://img.shields.io/badge/Powered%20by-ESP32-9333EA?style=flat-square)
![React](https://img.shields.io/badge/Developed%20with-React-D946A5?style=flat-square)
![MQTT](https://img.shields.io/badge/Connected%20by-MQTT-9333EA?style=flat-square)

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=150&color=0:581C87,35:9333EA,70:D946A5,100:F9A8D4&section=footer&animation=fadeIn" />

</div>
