import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LuDroplets,
    LuArrowLeft,
    LuRefreshCw,
    LuClock,
} from "react-icons/lu";

//Endereço do Servidor
const enderecoServidor = "https://projeto-estufa-frontend.vercel.app";

export default function Umidade() {
    const [umidade, setUmidade] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let buscando = false;

        async function buscarUmidade() {
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
                const texto = String(dados.umidade ?? "")
                    .replace(/%/g, "")
                    .replace(",", ".")
                    .trim();

                const valor = texto === "" ? NaN : Number(texto);

                if (!Number.isFinite(valor) || valor < 0 || valor > 100) {
                    throw new Error("Leitura de umidade indisponível.");
                }

                if (!controller.signal.aborted) {
                    setUmidade(valor);
                    setUltimaAtualizacao(new Date());
                    setErro("");
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setErro("Não foi possível atualizar a leitura.");
                }
            } finally {
                buscando = false;

                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarUmidade();
        const intervalo = setInterval(buscarUmidade, 5000);

        return () => {
            clearInterval(intervalo);
            controller.abort();
        };
    }, []);

    const temLeitura = umidade !== null;
    const porcentagem = temLeitura ? umidade : 0;

    const valorFormatado = temLeitura
        ? umidade.toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
        })
        : "—";

    const raio = 88;
    const circunferencia = 2 * Math.PI * raio;
    const deslocamento =
        circunferencia * (1 - porcentagem / 100);

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
                        <LuDroplets className="text-3xl text-pink-600" />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-widest text-pink-600 uppercase">
                            Monitoramento da estufa
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-pink-950 mt-1">
                            Umidade do ar
                        </h1>
                    </div>
                </div>

                {/* CARD PRINCIPAL */}
                <section className="relative overflow-hidden bg-white rounded-[2rem] border border-white shadow-xl shadow-pink-900/5">
                    {/* DETALHES DECORATIVOS */}
                    <div
                        aria-hidden="true"
                        className="absolute -top-20 -right-20 w-64 h-64 bg-pink-50 rounded-full"
                    />

                    <div className="relative grid md:grid-cols-2">
                        {/* INDICADOR CIRCULAR */}
                        <div className="p-8 md:p-12 flex flex-col items-center justify-center">
                            <span className="bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-2 rounded-full">
                                Umidade relativa
                            </span>

                            <div
                                role="img"
                                aria-label={
                                    temLeitura
                                        ? `Última leitura: ${valorFormatado}% de umidade`
                                        : "Umidade sem leitura disponível"
                                }
                                className="relative w-64 h-64 my-6"
                            >
                                <svg
                                    viewBox="0 0 220 220"
                                    className="w-full h-full -rotate-90"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r={raio}
                                        fill="none"
                                        stroke="#fce7f3"
                                        strokeWidth="12"
                                    />

                                    <circle
                                        cx="110"
                                        cy="110"
                                        r={raio}
                                        fill="none"
                                        stroke="#db2777"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={circunferencia}
                                        strokeDashoffset={deslocamento}
                                        style={{
                                            transition: "stroke-dashoffset 1s ease",
                                            opacity: temLeitura ? 1 : 0,
                                        }}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <LuDroplets className="text-4xl text-pink-500 mb-3" />

                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-bold tracking-tight text-pink-950">
                                            {valorFormatado}
                                        </span>

                                        {temLeitura && (
                                            <span className="text-xl font-semibold text-pink-400">
                                                %
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-xs text-gray-500 mt-2">
                                        {carregando
                                            ? "Buscando leitura..."
                                            : temLeitura
                                                ? "Última leitura recebida"
                                                : "Aguardando dados"}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 text-center">
                                Condições do ar no ambiente monitorado
                            </p>
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="bg-pink-50/70 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-pink-950">
                                O ambiente da sua estufa
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                Acompanhe a umidade relativa do ar medida pelo
                                sensor. O indicador acompanha a porcentagem
                                recebida pela aplicação.
                            </p>

                            {/* BARRA DE UMIDADE */}
                            <div className="mt-8">
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="font-semibold text-pink-900">
                                        Umidade relativa
                                    </span>

                                    <span className="text-pink-700 font-bold">
                                        {temLeitura ? `${valorFormatado}%` : "Sem dados"}
                                    </span>
                                </div>

                                <div
                                    role="meter"
                                    aria-label="Umidade relativa do ar"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={temLeitura ? umidade : undefined}
                                    aria-valuetext={
                                        temLeitura ? `${valorFormatado}%` : "Sem dados"
                                    }
                                    className="h-3 bg-pink-100 rounded-full overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${porcentagem}%` }}
                                    />
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
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
                                    {temLeitura &&
                                        " Exibindo a última leitura recebida."}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* EXPLICAÇÃO */}
                <div className="flex items-start gap-4 bg-white/70 border border-white rounded-2xl p-6 mt-6">
                    <LuDroplets className="text-2xl text-pink-600 shrink-0 mt-1" />

                    <div>
                        <h3 className="font-bold text-pink-950">
                            Entendendo a leitura
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mt-2">
                            A porcentagem indica a umidade relativa do ar.
                            A condição ideal depende das plantas cultivadas
                            e da temperatura do ambiente. Este sensor acompanha
                            o ar; a umidade do solo é medida separadamente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}