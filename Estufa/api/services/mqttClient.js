import "dotenv/config";
import mqtt from "mqtt";

export const TOPICO_UMIDADE = "aula/27/umidadeAr";
export const TOPICO_TEMPERATURA = "aula/27/temperatura";
export const TOPICO_STATUS_CHUVA = "aula/27/statusChuva";
export const TOPICO_COBERTURA = "aula/27/cobertura";
export const TOPICO_ESTADO_PIR = "aula/27/presencaPir";

export function buscarMensagens(topicos) {
    return new Promise((resolve, reject) => {
        const host = process.env.MQTT_HOST;
        const username = process.env.MQTT_USERNAME;
        const password = process.env.MQTT_PASSWORD;

        if (!host || !username || !password) {
            reject(new Error("Configure as variáveis de ambiente MQTT."));
            return;
        }

        const mensagens = {};
        const pendentes = new Set(topicos);
        let finalizado = false;

        const cliente = mqtt.connect(`mqtts://${host}`, {
            port: Number(process.env.MQTT_PORT || 8883),
            username,
            password,
            reconnectPeriod: 0,
            connectTimeout: 8000,
            clean: true,
        });

        const finalizar = (erro) => {
            if (finalizado) return;
            finalizado = true;

            clearTimeout(temporizador);
            cliente.end(true);

            if (erro) {
                reject(erro);
            } else {
                resolve(mensagens);
            }
        };

        const temporizador = setTimeout(() => {
            finalizar(
                new Error("Não foi possível receber todos os dados dos sensores."),
            );
        }, 10000);

        cliente.on("connect", () => {
            cliente.subscribe(topicos, (erro, permissoes) => {
                if (erro) {
                    finalizar(erro);
                    return;
                }

                if (permissoes?.some((item) => item.qos >= 128)) {
                    finalizar(new Error("O broker recusou a leitura dos tópicos."));
                }
            });
        });

        cliente.on("message", (topico, mensagem) => {
            if (!pendentes.has(topico)) return;

            mensagens[topico] = mensagem.toString();
            pendentes.delete(topico);

            if (pendentes.size === 0) {
                finalizar();
            }
        });

        cliente.on("error", (erro) => finalizar(erro));

        cliente.on("close", () => {
            if (!finalizado) {
                finalizar(new Error("A conexão MQTT foi encerrada."));
            }
        });
    });
}
