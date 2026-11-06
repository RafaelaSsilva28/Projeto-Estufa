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

A Estufa Inteligente reúne três etapas que trabalham em conjunto: **monitoramento e automação, comunicação de dados e visualização web**.

<div align="center">

### 🌷 Conheça e explore o projeto

<a href="https://wokwi.com/projects/473531629478178817">
  <img src="https://img.shields.io/badge/🔌_SIMULAÇÃO_DO_CIRCUITO-9333EA?style=for-the-badge&logoColor=white" />
</a>

&nbsp;

<a href="https://projeto-estufa-frontend.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_APLICAÇÃO_WEB-D946A5?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<br/>

<sub>Explore a simulação do circuito e acesse a interface web da Estufa Inteligente.</sub>

</div>

### 🧭 Arquitetura do sistema

```mermaid
flowchart TB
    subgraph A["01 · MONITORAMENTO E AUTOMAÇÃO"]
        direction TB
        S["Sensores<br/>DHT · Chuva · PIR · RFID"]
        ESP["ESP32"]
        ACT["Servo motor · LCD · OLED"]
        S --> ESP
        ESP --> ACT
    end

    subgraph B["02 · COMUNICAÇÃO"]
        direction LR
        MQTT["MQTT"]
        HIVE["HiveMQ Cloud"]
        MQTT --> HIVE
    end

    subgraph C["03 · APLICAÇÃO WEB"]
        direction LR
        API["Backend<br/>Node.js"]
        REACT["Frontend<br/>React"]
        API --> REACT
    end

    ESP --> MQTT
    HIVE --> API

    style A fill:#FDF2F8,stroke:#DB2777,color:#831843
    style B fill:#F5F3FF,stroke:#9333EA,color:#581C87
    style C fill:#FDF2F8,stroke:#D946A5,color:#831843
    style ESP fill:#9333EA,color:#FFFFFF,stroke:#6B21A8
    style HIVE fill:#A855F7,color:#FFFFFF,stroke:#7E22CE
    style REACT fill:#DB2777,color:#FFFFFF,stroke:#9D174D
```

### ⚙️ Etapas da integração

<table>
<tr>
<td width="33%" align="center">

### 🌱 01

**CIRCUITO**

<img src="https://img.shields.io/badge/ESP32-Sensores-9333EA?style=flat-square" />

Leitura dos sensores, identificação RFID e controle automático dos componentes.

</td>
<td width="33%" align="center">

### 📡 02

**COMUNICAÇÃO**

<img src="https://img.shields.io/badge/MQTT-HiveMQ-A855F7?style=flat-square" />

Envio das informações por tópicos MQTT para a estrutura de integração.

</td>
<td width="33%" align="center">

### 💻 03

**APLICAÇÃO**

<img src="https://img.shields.io/badge/React-Interface-D946A5?style=flat-square" />

Organização e apresentação das informações em uma interface web.

</td>
</tr>
</table>

### 🔄 Funcionamento

1. **Coleta:** os sensores identificam as condições do ambiente.
2. **Processamento:** o ESP32 interpreta as leituras e executa as ações programadas.
3. **Automação:** o servo motor e os displays são atualizados.
4. **Comunicação:** os dados são publicados nos tópicos MQTT.
5. **Integração:** a estrutura de backend organiza as informações recebidas.
6. **Visualização:** a interface web apresenta os dados do monitoramento.

<div align="center">

| 🔌 Simulação do circuito | 🌐 Aplicação publicada |
|:--:|:--:|
| **Wokwi** | **Estufa Inteligente** |
| [Abrir projeto](https://wokwi.com/projects/473531629478178817) | [Visitar site](https://projeto-estufa-frontend.vercel.app/) |

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
