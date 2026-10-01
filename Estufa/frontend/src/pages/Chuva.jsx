import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LuArrowLeft,
    LuCloudRain,
    LuSun,
    LuCloud,
    LuRefreshCw,
    LuClock,
} from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";

const enderecoServidor = "https://webcontroleapi.vercel.app";

export default function Chuva() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let buscando = false;

        async function buscarChuva() {
            if (buscando) return;
            buscando = true;

            try {
                const resposta = await fetch(
                    `${enderecoServidor}/controleChuva/dadosChuva`,
                    { signal: controller.signal }
                );

                if (!resposta.ok) {
                    throw new Error("Falha ao consultar a API.");
                }

                const resultado = await resposta.json();

                if (!controller.signal.aborted) {
                    setDados(resultado);
                    setUltimaAtualizacao(new Date());
                    setErro("");
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setErro("Não foi possível atualizar os dados de chuva.");
                }
            } finally {
                buscando = false;

                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarChuva();
        const intervalo = setInterval(buscarChuva, 5000);

        return () => {
            clearInterval(intervalo);
            controller.abort();
        };
    }, []);

    function normalizar(valor) {
        return String(valor ?? "").trim().toLowerCase();
    }

    const status = normalizar(dados?.statusChuva);
    const telhado = normalizar(dados?.estadoTelhado);

    const chovendo = status === "chovendo";
    const semChuva = status === "sem chuva";

    const telhadoAberto = ["aberto", "aberta"].includes(telhado);
    const telhadoFechado = ["fechado", "fechada"].includes(telhado);

    const textoChuva = carregando
        ? "Buscando leitura..."
        : chovendo
            ? "Chovendo"
            : semChuva
                ? "Sem chuva"
                : "Sem leitura disponível";

    const textoTelhado = telhadoAberto
        ? "Aberto"
        : telhadoFechado
            ? "Fechado"
            : "Estado desconhecido";

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-5 pb-12 pt-24 md:px-10 md:pt-10">
            <style>{`
        @keyframes estufaGotaCaindo {
          0% {
            transform: translateY(-8px);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(45px);
            opacity: 0;
          }
        }

        .estufa-gota {
          animation: estufaGotaCaindo 1.4s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .estufa-gota {
            animation: none;
          }
        }
      `}</style>

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
                        <LuCloudRain className="text-3xl text-pink-600" />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-widest text-pink-600 uppercase">
                            Monitoramento da estufa
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-pink-950 mt-1">
                            Sensor de chuva
                        </h1>
                    </div>
                </div>

                {/* CARD PRINCIPAL */}
                <section className="relative overflow-hidden bg-white rounded-[2rem] border border-white shadow-xl shadow-pink-900/5">
                    <div
                        aria-hidden="true"
                        className="absolute -top-20 -right-20 w-64 h-64 bg-pink-50 rounded-full"
                    />

                    <div className="relative grid md:grid-cols-2">
                        {/* REPRESENTAÇÃO DO CLIMA */}
                        <div className="p-8 md:p-12 flex flex-col items-center justify-center">
                            <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-2 rounded-full">
                                Condição detectada
                            </span>

                            <div
                                aria-hidden="true"
                                className="relative w-60 h-60 rounded-full bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center my-7"
                            >
                                {chovendo ? (
                                    <div className="relative flex flex-col items-center">
                                        <LuCloud className="text-[120px] text-pink-600" />

                                        <div className="flex gap-5 h-14">
                                            {[0, 1, 2, 3].map((gota) => (
                                                <span
                                                    key={gota}
                                                    className="estufa-gota block w-2 h-5 rounded-full bg-pink-400"
                                                    style={{
                                                        animationDelay: `${gota * 0.25}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : semChuva ? (
                                    <LuSun className="text-[120px] text-amber-400" />
                                ) : (
                                    <LuCloud className="text-[120px] text-pink-300" />
                                )}
                            </div>

                            <h2
                                aria-live="polite"
                                className="text-3xl font-bold text-pink-950 text-center"
                            >
                                {textoChuva}
                            </h2>

                            <p className="text-sm text-gray-500 text-center mt-3">
                                {chovendo
                                    ? "O sensor está indicando presença de chuva."
                                    : semChuva
                                        ? "O sensor não está indicando chuva."
                                        : "Aguardando uma condição reconhecida do sensor."}
                            </p>
                        </div>

                        {/* ESTADO DO TELHADO */}
                        <div className="bg-pink-50/70 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-pink-950">
                                Cobertura da estufa
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                Acompanhe a condição de chuva e o estado do
                                telhado informado pelo sistema.
                            </p>

                            <div className="bg-white border border-pink-100 rounded-2xl p-6 mt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-pink-100 flex items-center justify-center">
                                        <GiGreenhouse className="text-4xl text-pink-700" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Estado do telhado
                                        </p>

                                        <h3 className="text-xl font-bold text-pink-950 mt-1">
                                            {textoTelhado}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 mt-4">
                                    Estado informado pela API.
                                </p>
                            </div>

                            {/* ATUALIZAÇÃO */}
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
                                    {dados && " Exibindo os últimos dados recebidos."}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* EXPLICAÇÃO */}
                <div className="flex items-start gap-4 bg-white/70 border border-white rounded-2xl p-6 mt-6">
                    <LuCloudRain className="text-2xl text-pink-600 shrink-0 mt-1" />

                    <div>
                        <h3 className="font-bold text-pink-950">
                            Chuva e controle do telhado
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mt-2">
                            O sensor identifica a presença de água na sua
                            superfície. O ESP32 utiliza essa leitura para
                            controlar o servo conforme a programação da estufa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}