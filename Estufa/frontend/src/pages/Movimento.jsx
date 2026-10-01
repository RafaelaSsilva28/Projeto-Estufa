import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LuArrowLeft,
    LuActivity,
    LuRefreshCw,
    LuClock,
} from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi2";

//Endereço do Servidor
const enderecoServidor = "http://localhost:3001";

function interpretarPresenca(valor) {
    if (valor === true || valor === 1) return true;
    if (valor === false || valor === 0) return false;

    const texto = String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

    const detectada = [
        "presenca detectada",
        "movimento detectado",
        "detectada",
        "true",
        "1",
    ];

    const naoDetectada = [
        "sem presenca",
        "sem movimento",
        "nenhuma presenca detectada",
        "nenhum movimento detectado",
        "presenca nao detectada",
        "movimento nao detectado",
        "nao detectada",
        "false",
        "0",
    ];

    if (detectada.includes(texto)) return true;
    if (naoDetectada.includes(texto)) return false;

    return null;
}

export default function Movimento() {
    const [presenca, setPresenca] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let buscando = false;

        async function buscarMovimento() {
            if (buscando) return;
            buscando = true;

            try {
                const resposta = await fetch(
                    `${enderecoServidor}/controleMovimento/movimento`,
                    { signal: controller.signal }
                );

                if (!resposta.ok) {
                    throw new Error("Falha ao consultar a API.");
                }

                const dados = await resposta.json();

                if (!controller.signal.aborted) {
                    setPresenca(interpretarPresenca(dados.presencaDetectada));
                    setUltimaAtualizacao(new Date());
                    setErro("");
                }
            } catch {
                if (!controller.signal.aborted) {
                    setErro("Não foi possível atualizar os dados de movimentação.");
                }
            } finally {
                buscando = false;

                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarMovimento();
        const intervalo = setInterval(buscarMovimento, 5000);

        return () => {
            clearInterval(intervalo);
            controller.abort();
        };
    }, []);

    const detectada = presenca === true;
    const semMovimento = presenca === false;

    const titulo = carregando
        ? "Buscando leitura..."
        : detectada
            ? "Movimento detectado"
            : semMovimento
                ? "Sem movimento"
                : "Sem leitura disponível";

    const descricao = detectada
        ? "O sensor PIR está indicando movimentação."
        : semMovimento
            ? "O sensor PIR não está indicando movimentação."
            : "Aguardando uma leitura reconhecida do sensor.";

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
                        <LuActivity className="text-3xl text-pink-600" />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-widest text-pink-600 uppercase">
                            Monitoramento da estufa
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-pink-950 mt-1">
                            Sensor de movimentação
                        </h1>
                    </div>
                </div>

                {/* CARD PRINCIPAL */}
                <section className="overflow-hidden bg-white rounded-[2rem] border border-white shadow-xl shadow-pink-900/5">
                    <div className="grid md:grid-cols-2">
                        {/* REPRESENTAÇÃO DO SENSOR */}
                        <div className="p-8 md:p-12 flex flex-col items-center justify-center">
                            <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-2 rounded-full">
                                Sensor PIR
                            </span>

                            <div
                                aria-hidden="true"
                                className="relative w-60 h-60 flex items-center justify-center my-7"
                            >
                                {detectada && (
                                    <div className="absolute inset-4 rounded-full border-4 border-pink-300 motion-safe:animate-ping" />
                                )}

                                <div
                                    className={`absolute inset-0 rounded-full border ${detectada
                                            ? "border-pink-200 bg-pink-50"
                                            : "border-pink-100 bg-pink-50/60"
                                        }`}
                                />

                                <div className="absolute inset-5 rounded-full border border-pink-200" />

                                <div
                                    className={`relative w-36 h-36 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${detectada
                                            ? "bg-pink-600 text-white shadow-pink-200"
                                            : "bg-white text-pink-300 shadow-pink-100"
                                        }`}
                                >
                                    <HiOutlineUser className="text-7xl" />
                                </div>

                                <div
                                    className={`absolute bottom-5 right-8 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center ${detectada ? "bg-pink-600" : "bg-pink-200"
                                        }`}
                                >
                                    <LuActivity className="text-white text-lg" />
                                </div>
                            </div>

                            <h2
                                aria-live="polite"
                                className="text-3xl font-bold text-pink-950 text-center"
                            >
                                {titulo}
                            </h2>

                            <p className="text-sm text-gray-500 text-center mt-3">
                                {descricao}
                            </p>
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="bg-pink-50/70 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-pink-950">
                                Movimentação ao redor
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                Acompanhe o estado de detecção informado pelo
                                sensor PIR instalado na estufa.
                            </p>

                            <div className="bg-white border border-pink-100 rounded-2xl p-6 mt-6">
                                <p className="text-sm text-gray-500">
                                    Último estado recebido
                                </p>

                                <div className="flex items-center gap-3 mt-3">
                                    <span
                                        className={`w-3 h-3 rounded-full shrink-0 ${detectada
                                                ? "bg-pink-600"
                                                : semMovimento
                                                    ? "bg-gray-400"
                                                    : "bg-amber-400"
                                            }`}
                                    />

                                    <h3 className="text-lg font-bold text-pink-950">
                                        {detectada
                                            ? "Presença detectada"
                                            : semMovimento
                                                ? "Nenhum movimento detectado"
                                                : "Aguardando dados"}
                                    </h3>
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
                                    {presenca !== null &&
                                        " Exibindo o último estado recebido."}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* EXPLICAÇÃO */}
                <div className="flex items-start gap-4 bg-white/70 border border-white rounded-2xl p-6 mt-6">
                    <LuActivity className="text-2xl text-pink-600 shrink-0 mt-1" />

                    <div>
                        <h3 className="font-bold text-pink-950">
                            Monitoramento de movimento
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mt-2">
                            Esta página apresenta o estado enviado pelo sensor.
                            Quando houver detecção, o indicador fica destacado
                            e pulsa para chamar a atenção.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}