import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { LuChartNoAxesCombined, LuRefreshCw } from "react-icons/lu";

const API_URL = (
    import.meta.env.VITE_API_URL ||
    "https://projeto-estufa-api.vercel.app"
).replace(/\/+$/, "");

const sensores = {
    temperatura: {
        nome: "Temperatura",
        topico: "clima",
        campo: "temperatura",
        unidade: " °C",
        cor: "#be185d",
        descricao: "Evolução da temperatura nas leituras salvas.",
    },
    umidade: {
        nome: "Umidade do ar",
        topico: "clima",
        campo: "umidade",
        unidade: "%",
        cor: "#7c3aed",
        descricao: "Evolução da umidade do ar nas leituras salvas.",
    },
    chuva: {
        nome: "Chuva",
        topico: "chuva",
        campo: "chuvaDetectada",
        cor: "#0284c7",
        binario: true,
        descricao: "Registro de chuva detectada ao longo do tempo.",
    },
    presenca: {
        nome: "Movimento / presença",
        topico: "presenca",
        campo: "presencaDetectada",
        cor: "#059669",
        binario: true,
        descricao: "Registro de presença detectada ao longo do tempo.",
    },
};

function formatarData(valor) {
    return new Date(valor).toLocaleString("pt-BR");
}

function formatarEixo(valor) {
    return new Date(valor).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatarValor(valor, sensor) {
    if (sensor === "chuva") {
        return valor === 1 ? "Chuva detectada" : "Sem chuva";
    }

    if (sensor === "presenca") {
        return valor === 1 ? "Presença detectada" : "Sem presença";
    }

    return `${Number(valor).toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
    })}${sensores[sensor].unidade}`;
}

function converterLeitura(registro, configuracao) {
    const data = new Date(registro.data_hora).getTime();
    const bruto = registro.dados?.[configuracao.campo];

    if (!Number.isFinite(data)) return null;

    let valor;

    if (configuracao.binario) {
        if (typeof bruto !== "boolean") return null;
        valor = bruto ? 1 : 0;
    } else {
        if (
            bruto === null ||
            bruto === undefined ||
            String(bruto).trim() === ""
        ) {
            return null;
        }

        valor = Number(bruto);

        if (!Number.isFinite(valor)) return null;
    }

    return {
        id: registro.id,
        data,
        valor,
    };
}

export default function Graficos() {
    const [sensor, setSensor] = useState("temperatura");
    const [leituras, setLeituras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [atualizacao, setAtualizacao] = useState(0);

    const configuracao = sensores[sensor];

    useEffect(() => {
        const controller = new AbortController();
        const config = sensores[sensor];

        async function carregar() {
            setCarregando(true);
            setErro("");
            setLeituras([]);

            try {
                const resposta = await fetch(
                    `${API_URL}/historico?sensor=${config.topico}`,
                    {
                        signal: controller.signal,
                        cache: "no-store",
                    },
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Não foi possível carregar os dados (HTTP ${resposta.status}).`,
                    );
                }

                const registros = await resposta.json();

                if (!Array.isArray(registros)) {
                    throw new Error("A API retornou dados inválidos.");
                }

                const pontos = registros
                    .map((registro) => converterLeitura(registro, config))
                    .filter((registro) => registro !== null)
                    .sort(
                        (a, b) =>
                            a.data - b.data || Number(a.id) - Number(b.id),
                    );

                if (!controller.signal.aborted) {
                    setLeituras(pontos);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setErro(error.message || "Erro ao consultar os dados.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregar();

        return () => controller.abort();
    }, [sensor, atualizacao]);

    const ultimaLeitura = leituras.at(-1);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-rose-50 px-4 pb-10 pt-24 sm:px-8 md:pt-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-800 text-white shadow-lg shadow-pink-200">
                            <LuChartNoAxesCombined className="h-7 w-7" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-pink-900 sm:text-3xl">
                                Gráficos dos sensores
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Acompanhe as leituras registradas da estufa.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={carregando}
                        onClick={() => setAtualizacao((valor) => valor + 1)}
                        className="flex items-center gap-2 rounded-xl bg-pink-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-pink-900 disabled:cursor-wait disabled:opacity-60"
                    >
                        <LuRefreshCw
                            className={`h-5 w-5 ${
                                carregando ? "animate-spin" : ""
                            }`}
                        />
                        {carregando ? "Carregando..." : "Atualizar"}
                    </button>
                </div>

                <div className="mb-6 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                    <label
                        htmlFor="sensor-grafico"
                        className="mb-3 block font-semibold text-pink-900"
                    >
                        Escolha o sensor
                    </label>

                    <select
                        id="sensor-grafico"
                        value={sensor}
                        onChange={(event) => setSensor(event.target.value)}
                        className="w-full rounded-xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-gray-800 outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-100 sm:max-w-sm"
                    >
                        {Object.entries(sensores).map(([valor, config]) => (
                            <option key={valor} value={valor}>
                                {config.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <section className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-pink-900">
                                {configuracao.nome}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {configuracao.descricao}
                            </p>
                        </div>

                        {!carregando && !erro && ultimaLeitura && (
                            <div className="rounded-xl bg-pink-50 px-4 py-3">
                                <p className="text-xs text-gray-500">
                                    Última leitura salva
                                </p>
                                <p className="mt-1 font-bold text-pink-800">
                                    {formatarValor(ultimaLeitura.valor, sensor)}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {formatarData(ultimaLeitura.data)}
                                </p>
                            </div>
                        )}
                    </div>

                    <div role="status" aria-live="polite">
                        {carregando && (
                            <div className="flex h-80 items-center justify-center gap-3 text-pink-800">
                                <LuRefreshCw className="h-6 w-6 animate-spin" />
                                Carregando gráfico...
                            </div>
                        )}
                    </div>

                    {!carregando && erro && (
                        <div
                            role="alert"
                            className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
                        >
                            <p className="font-semibold">
                                Não conseguimos carregar o gráfico.
                            </p>
                            <p className="mt-2 text-sm">{erro}</p>
                            <p className="mt-2 text-sm">
                                Clique em Atualizar para tentar novamente.
                            </p>
                        </div>
                    )}

                    {!carregando && !erro && leituras.length === 0 && (
                        <div className="flex h-80 flex-col items-center justify-center text-center">
                            <LuChartNoAxesCombined className="mb-4 h-12 w-12 text-pink-300" />
                            <p className="font-semibold text-gray-700">
                                Nenhuma leitura disponível
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                O gráfico aparecerá quando houver registros
                                válidos desse sensor no banco.
                            </p>
                        </div>
                    )}

                    {!carregando && !erro && leituras.length > 0 && (
                        <>
                            {leituras.length === 1 && (
                                <p className="mb-4 rounded-xl bg-pink-50 p-3 text-sm text-pink-800">
                                    Existe apenas uma leitura. Novos registros
                                    permitirão visualizar a evolução.
                                </p>
                            )}

                            <div
                                className="h-80 w-full sm:h-96"
                                role="img"
                                aria-label={`Gráfico de ${configuracao.nome}, com ${leituras.length} leituras. Última leitura: ${formatarValor(
                                    ultimaLeitura.valor,
                                    sensor,
                                )}.`}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={leituras}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            left: 10,
                                            bottom: 25,
                                        }}
                                    >
                                        <CartesianGrid
                                            stroke="#fce7f3"
                                            strokeDasharray="4 4"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="data"
                                            type="number"
                                            scale="time"
                                            domain={[
                                                "dataMin - 1000",
                                                "dataMax + 1000",
                                            ]}
                                            tickFormatter={formatarEixo}
                                            minTickGap={45}
                                            tick={{
                                                fill: "#6b7280",
                                                fontSize: 11,
                                            }}
                                            tickMargin={12}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            width={
                                                configuracao.binario ? 105 : 65
                                            }
                                            domain={
                                                configuracao.binario
                                                    ? [-0.1, 1.1]
                                                    : sensor === "umidade"
                                                      ? [0, 100]
                                                      : ["auto", "auto"]
                                            }
                                            ticks={
                                                configuracao.binario
                                                    ? [0, 1]
                                                    : undefined
                                            }
                                            tickFormatter={(valor) =>
                                                formatarValor(valor, sensor)
                                            }
                                            tick={{
                                                fill: "#6b7280",
                                                fontSize: 11,
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <Tooltip
                                            labelFormatter={formatarData}
                                            formatter={(valor) => [
                                                formatarValor(valor, sensor),
                                                configuracao.nome,
                                            ]}
                                            contentStyle={{
                                                borderRadius: "12px",
                                                borderColor: "#fbcfe8",
                                                fontSize: "13px",
                                            }}
                                        />

                                        <Line
                                            type={
                                                configuracao.binario
                                                    ? "stepAfter"
                                                    : "linear"
                                            }
                                            dataKey="valor"
                                            name={configuracao.nome}
                                            stroke={configuracao.cor}
                                            strokeWidth={3}
                                            dot={{
                                                r: 3,
                                                fill: configuracao.cor,
                                                stroke: "#fff",
                                                strokeWidth: 1,
                                            }}
                                            activeDot={{ r: 6 }}
                                            isAnimationActive={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <p className="mt-3 text-center text-xs text-gray-500">
                                Data e hora das leituras • {leituras.length}{" "}
                                registro(s)
                            </p>
                        </>
                    )}
                </section>

                <p className="mt-4 text-sm text-gray-500">
                    São exibidos até 200 registros mais recentes do sensor.
                    As linhas conectam as leituras salvas; o estado entre
                    elas não foi medido continuamente.
                </p>
            </div>
        </div>
    );
}