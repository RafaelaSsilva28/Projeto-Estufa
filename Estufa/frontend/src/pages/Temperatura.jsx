import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LuArrowLeft,
    LuThermometer,
    LuRefreshCw,
    LuClock,
} from "react-icons/lu";

//Endereço do Servidor
const enderecoServidor = "https://projeto-estufa-frontend.vercel.app";

export default function Temperatura() {
    const [temperatura, setTemperatura] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let buscando = false;

        async function buscarTemperatura() {
            if (buscando) return;
            buscando = true;

            try {
                const resposta = await fetch(
                    `${enderecoServidor}/controleUmidade/dadosClima`,
                    { signal: controller.signal }
                );

                if (!resposta.ok) {
                    throw new Error("Falha ao consultar a API.");
                }

                const dados = await resposta.json();

                const texto = String(dados.temperatura ?? "")
                    .replace(/°\s*C|°|C/gi, "")
                    .replace(",", ".")
                    .trim();

                const valor = texto === "" ? NaN : Number(texto);

                if (!Number.isFinite(valor)) {
                    throw new Error("Leitura de temperatura indisponível.");
                }

                if (!controller.signal.aborted) {
                    setTemperatura(valor);
                    setUltimaAtualizacao(new Date());
                    setErro("");
                }
            } catch {
                if (!controller.signal.aborted) {
                    setErro("Não foi possível atualizar a temperatura.");
                }
            } finally {
                buscando = false;

                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarTemperatura();
        const intervalo = setInterval(buscarTemperatura, 5000);

        return () => {
            clearInterval(intervalo);
            controller.abort();
        };
    }, []);

    const temLeitura = temperatura !== null;

    const valorFormatado = temLeitura
        ? temperatura.toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
        })
        : "—";

    // Escala visual de -10 °C até 50 °C.
    // A leitura numérica continua mostrando o valor real.
    const preenchimento = temLeitura
        ? Math.min(100, Math.max(0, ((temperatura + 10) / 60) * 100))
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-5 pb-12 pt-24 md:px-10 md:pt-10">
            <div className="max-w-5xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-pink-800 hover:text-pink-950 mb-8"
                >
                    <LuArrowLeft />
                    Voltar ao início
                </Link>

                {/* CABEÇALHO */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                        <LuThermometer className="text-3xl text-pink-600" />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-widest text-pink-600 uppercase">
                            Monitoramento da estufa
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-pink-950 mt-1">
                            Temperatura
                        </h1>
                    </div>
                </div>

                {/* CARD PRINCIPAL */}
                <section className="overflow-hidden bg-white rounded-[2rem] border border-white shadow-xl shadow-pink-900/5">
                    <div className="grid md:grid-cols-2">
                        {/* TERMÔMETRO */}
                        <div className="p-8 md:p-12 flex flex-col items-center justify-center">
                            <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-2 rounded-full">
                                Temperatura do ambiente
                            </span>

                            <div
                                aria-hidden="true"
                                className="relative w-64 h-72 my-7 rounded-3xl bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center"
                            >
                                <div className="relative w-40 h-60">
                                    {/* TUBO */}
                                    <div className="absolute top-0 left-10 w-14 h-48 rounded-t-full border-4 border-pink-200 bg-white">
                                        <div className="absolute inset-x-3 top-3 bottom-0 overflow-hidden rounded-t-full bg-pink-50">
                                            <div
                                                className="absolute bottom-0 w-full rounded-t-full bg-gradient-to-t from-pink-600 to-rose-400 transition-all duration-1000"
                                                style={{
                                                    height: `${preenchimento}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* BULBO */}
                                    <div className="absolute bottom-0 left-6 w-22 h-22 rounded-full border-4 border-pink-200 bg-white flex items-center justify-center">
                                        <div
                                            className={`w-16 h-16 rounded-full transition-colors duration-500 ${temLeitura ? "bg-pink-600" : "bg-pink-100"
                                                }`}
                                        />
                                    </div>

                                    {/* MARCAÇÕES DA ESCALA */}
                                    <div className="absolute top-3 bottom-16 right-0 flex flex-col justify-between">
                                        {[50, 35, 20, 5, -10].map((valor) => (
                                            <div
                                                key={valor}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="w-3 h-px bg-pink-300" />

                                                <span className="text-xs font-semibold text-pink-700">
                                                    {valor}°
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                aria-live="polite"
                                className="flex items-baseline gap-2"
                            >
                                <span className="text-5xl font-bold tracking-tight text-pink-950">
                                    {valorFormatado}
                                </span>

                                {temLeitura && (
                                    <span className="text-2xl font-semibold text-pink-500">
                                        °C
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-500 text-center mt-3">
                                {carregando
                                    ? "Buscando leitura..."
                                    : temLeitura
                                        ? "Última leitura recebida"
                                        : "Aguardando dados do sensor"}
                            </p>
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="bg-pink-50/70 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-pink-950">
                                Clima da sua estufa
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                Acompanhe a temperatura medida pelo sensor
                                no ambiente monitorado.
                            </p>

                            <div className="bg-white border border-pink-100 rounded-2xl p-6 mt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 shrink-0 bg-pink-100 rounded-2xl flex items-center justify-center">
                                        <LuThermometer className="text-3xl text-pink-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Temperatura recebida
                                        </p>

                                        <h3 className="text-2xl font-bold text-pink-950 mt-1">
                                            {temLeitura
                                                ? `${valorFormatado} °C`
                                                : "Sem dados"}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mt-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-xl p-3 text-pink-600">
                                        <LuRefreshCw className="text-lg" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-pink-950">
                                            Consulta automática
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            A cada 5 segundos
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-xl p-3 text-pink-600">
                                        <LuClock className="text-lg" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-pink-950">
                                            Última consulta com sucesso
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {ultimaAtualizacao
                                                ? ultimaAtualizacao.toLocaleTimeString("pt-BR")
                                                : "Aguardando leitura"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {erro && (
                                <p
                                    role="alert"
                                    className="mt-6 rounded-xl bg-rose-100 p-4 text-sm text-rose-800"
                                >
                                    {erro}
                                    {temLeitura &&
                                        " Exibindo a última leitura recebida."}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* EXPLICAÇÃO */}
                <div className="flex items-start gap-4 bg-white/70 border border-white rounded-2xl p-6 mt-6">
                    <LuThermometer className="text-2xl text-pink-600 shrink-0 mt-1" />

                    <div>
                        <h3 className="font-bold text-pink-950">
                            Entendendo a temperatura
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mt-2">
                            A leitura é apresentada em graus Celsius. O termômetro
                            utiliza uma escala visual de -10 °C a 50 °C; valores fora
                            dessa escala continuam aparecendo no número.
                            A temperatura ideal depende das plantas cultivadas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}