import mqtt from "mqtt";

//TOPICOS DE ROTA DE CONTROLE DE ACESSO
// const TOPICO_RFID = "";
// const TOPICO_RESULTADO_ACESSO = "";
//TOPICOS DE ROTA DE CONTROLE DE UMIDADE E TEMPERATURA
const TOPICO_UMIDADE = "aula/27/umidadeAr";
const TOPICO_TEMPERATURA = "aula/27/temperatura";
//ROTA DE CONTROLE DE CHUVA
const TOPICO_STATUS_CHUVA = "aula/27/statusChuva";
const TOPICO_COBERTURA = "aula/27/cobertura";
//ROTA DE CONTROLE DE MOVIMENTO
const TOPICO_ESTADO_PIR = "aula/27/presencaPir";

// ========== VARIÁVEIS GLOBAIS ==========
let mqttClient = null;          // Guarda a conexão MQTT
let conectado = false;       // Evita conectar 2 vezes ao mesmo tempo
const subscriptions = {};       // Guarda as funções de callback dos 

const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt() {
    //Valida se está conectado
    if (mqttClient?.connected || conectado) {
        console.log(`MQTT já conectado`)
        return
    }

    console.log('MQTT tentando conectar...')
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    conectado = true;

    //Quando conectado com sucesso
    mqttClient.on(`connect`, () => {
        console.log(`MQTT conectado`)

        //Inscreve em todos os topicos de uma vez
        const topicos = [
            TOPICO_TEMPERATURA,
            TOPICO_UMIDADE,
            TOPICO_STATUS_CHUVA,
            TOPICO_COBERTURA,
            TOPICO_ESTADO_PIR,
            
    
        ]

        mqttClient.subscribe(topicos, (error) => {
            if (!error) {
                console.log(`MQTT: Inscrito em ${topicos.length} topicos`)
            }
        })
    })

    //Quando receber uma mensagem alterada 
    mqttClient.on(`message`, (topic, message) => {
        //Se existe uma função cadastrada nesse topico, recebe a mensagem 
        if (subscriptions[topic]) {
            subscriptions[topic](message.toString())
        }
    })

    //Quando escutar um erro 
    mqttClient.on(`error`, (error) => {
        conectado = false
        console.error(`MQTT: Erro ->`, error.message)
    })

    //Quando escutar um erro 
    mqttClient.on(`close`, () => {
        conectado = false
        console.error(`MQTT: Conexão Fechada`)
    })

    //Quando escutar um erro 
    mqttClient.on(`close`, () => {
        conectado = false
        console.error(`MQTT: Conexão Fechada`)
    })

    //Quando ficar offline 
    mqttClient.on(`offline`, () => {
        console.error(`MQTT: Ficou Offline`)
    })
    mqttClient.on(`reconnect`, () => {
        console.error(`Tentando Conexão`)
    })

}