import { useEffect, useState } from "react";
import {
    LuHistory,
    LuRefreshCw,
    LuFilter,
    LuDatabase,
} from "react-icons/lu";

const API_URL = (
    import.meta.env.VITE_API_URL ||
    "https://projeto-estufa-api.vercel.app"
).replace(/\/+$/, "");

const sensores = [
    { valor: "todos", nome: "Todos os sensores" },
    { valor: "temperatura", nome: "Temperatura" },
    { valor: "umidade", nome: "Umidade do ar" },
    { valor: "chuva", nome: "Chuva e telhado" },
    { valor: "presenca", nome: "Movimento / presença" },
    { valor: "rfid", nome: "RFID" },
];

const nomesSensores = {
    clima: "Temperatura e umidade",
    chuva: "Chuva e telhado",
    presenca: "Movimento / presença",
    rfid: "RFID",
};

function formatarData(valor) {
    if (!valor) return "Não informada";

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) return "Data inválida";

    return data.toLocaleString("pt-BR");
}

function formatarNumero(valor, unidade) {
    if (
        valor === null ||
        valor === undefined ||
        String(valor).trim() === ""
    ) {
        return "Não informado";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) return "Não informado";

    return `${numero.toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
    })}${unidade}`;
}

function descreverLeitura(registro, filtro) {
    const dados = registro.dados ?? {};

    switch (registro.sensor) {
        case "clima": {
            const temperatura = formatarNumero(dados.temperatura, " °C");
            const umidade = formatarNumero(dados.umidade, "%");

            if (filtro === "temperatura") {
                return `Temperatura: ${temperatura}`;
            }

            if (filtro === "umidade") {
                return `Umidade: ${umidade}`;
            }

            return `Temperatura: ${temperatura} • Umidade: ${umidade}`;
        }

        case "chuva":
            return [
                dados.chuvaDetectada === true
                    ? "Chuva detectada"
                    : dados.chuvaDetectada === false
                      ? "Sem chuva"
                      : "Chuva não informada",
                `Telhado: ${dados.estadoTelhado || "não informado"}`,
            ].join(" • ");

        case "presenca":
            return dados.presencaDetectada === true
                ? "Presença detectada"
                : dados.presencaDetectada === false
                  ? "Sem presença"
                  : "Presença não informada";

        case "rfid":
            return `${dados.nome || "Cartão RFID"} • UID: ${
                dados.uid || "não informado"
            }`;

        default:
            return "Leitura não reconhecida";
    }
}

export default function Historico() {
    const [sensor, setSensor] = useState("todos");
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [atualizacao, setAtualizacao] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function buscarHistorico() {
            setCarregando(true);
            setErro("");
            setRegistros([]);

            // Temperatura e umidade estão na mesma tabela do banco.
            const sensorAPI =
                sensor === "temperatura" || sensor === "umidade"
                    ? "clima"
                    : sensor;

            try {
                const resposta = await fetch(
                    `${API_URL}/historico?sensor=${sensorAPI}`,
                    {
                        signal: controller.signal,
                        cache: "no-store",
                    },
                );

                if (!resposta.ok) {
                    throw new Error(
                        `Não foi possível carregar o histórico (HTTP ${resposta.status}).`,
                    );
                }

                const dados = await resposta.json();

                if (!Array.isArray(dados)) {
                    throw new Error("A API retornou um histórico inválido.");
                }

                if (!controller.signal.aborted) {
                    setRegistros(dados);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setErro(
                        error.message || "Erro ao consultar o histórico.",
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        buscarHistorico();

        return () => controller.abort();
    }, [sensor, atualizacao]);

    const nomeFiltro = sensores.find(
        (item) => item.valor === sensor,
    )?.nome;

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-rose-50 px-4 pb-10 pt-24 sm:px-8 md:pt-10">
            <div className="mx-auto max-w-6xl">
                {/* Cabeçalho */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-800 text-white shadow-lg shadow-pink-200">
                            <LuHistory className="h-7 w-7" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-pink-900 sm:text-3xl">
                                Histórico dos sensores
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Consulte as leituras salvas da sua estufa.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={carregando}
                        onClick={() => setAtualizacao((valor) => valor + 1)}
                        className="flex items-center gap-2 rounded-xl bg-pink-800 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-pink-900 disabled:cursor-wait disabled:opacity-60"
                    >
                        <LuRefreshCw
                            className={`h-5 w-5 ${
                                carregando ? "animate-spin" : ""
                            }`}
                        />
                        {carregando ? "Carregando..." : "Atualizar"}
                    </button>
                </div>

                {/* Filtro */}
                <div className="mb-6 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                    <label
                        htmlFor="filtro-sensor"
                        className="mb-3 flex items-center gap-2 font-semibold text-pink-900"
                    >
                        <LuFilter className="h-5 w-5" />
                        Filtrar por sensor
                    </label>

                    <select
                        id="filtro-sensor"
                        value={sensor}
                        onChange={(event) => setSensor(event.target.value)}
                        className="w-full rounded-xl border border-pink-200 bg-pink-50/50 px-4 py-3 text-gray-800 outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-100 sm:max-w-sm"
                    >
                        {sensores.map((item) => (
                            <option key={item.valor} value={item.valor}>
                                {item.nome}
                            </option>
                        ))}
                    </select>

                    <p className="mt-3 text-sm text-gray-500">
                        Exibe até 200 registros mais recentes do filtro
                        selecionado.
                    </p>
                </div>

                {/* Histórico */}
                <section className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-100 px-5 py-4">
                        <h2 className="font-semibold text-pink-900">
                            {nomeFiltro}
                        </h2>

                        {!carregando && !erro && (
                            <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                                {registros.length} registro(s)
                            </span>
                        )}
                    </div>

                    <div role="status" aria-live="polite">
                        {carregando && (
                            <div className="flex items-center justify-center gap-3 p-12 text-pink-800">
                                <LuRefreshCw className="h-6 w-6 animate-spin" />
                                Buscando histórico...
                            </div>
                        )}
                    </div>

                    {!carregando && erro && (
                        <div
                            role="alert"
                            className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                        >
                            <p className="font-semibold">
                                Não conseguimos carregar os registros.
                            </p>
                            <p className="mt-1 text-sm">{erro}</p>
                            <p className="mt-2 text-sm">
                                Use o botão Atualizar para tentar novamente.
                            </p>
                        </div>
                    )}

                    {!carregando && !erro && registros.length === 0 && (
                        <div className="flex flex-col items-center px-5 py-14 text-center">
                            <LuDatabase className="mb-4 h-12 w-12 text-pink-300" />
                            <h3 className="font-semibold text-gray-700">
                                Nenhum registro encontrado
                            </h3>
                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                Ainda não existem leituras salvas para esse
                                filtro.
                            </p>
                        </div>
                    )}

                    {!carregando && !erro && registros.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <caption className="sr-only">
                                    Histórico de leituras: {nomeFiltro}
                                </caption>

                                <thead className="bg-pink-50 text-pink-900">
                                    <tr>
                                        <th scope="col" className="px-5 py-4">
                                            Sensor
                                        </th>
                                        <th scope="col" className="px-5 py-4">
                                            Leitura
                                        </th>
                                        <th scope="col" className="px-5 py-4">
                                            Data e hora
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-pink-50">
                                    {registros.map((registro) => (
                                        <tr
                                            key={`${registro.sensor}-${registro.id}`}
                                            className="transition-colors hover:bg-pink-50/60"
                                        >
                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span className="inline-block rounded-lg bg-pink-100 px-3 py-1 font-medium text-pink-800">
                                                    {registro.sensor === "clima" &&
                                                    sensor !== "todos"
                                                        ? nomeFiltro
                                                        : nomesSensores[
                                                              registro.sensor
                                                          ] || registro.sensor}
                                                </span>
                                            </td>

                                            <td className="min-w-64 px-5 py-4 text-gray-700">
                                                {descreverLeitura(
                                                    registro,
                                                    sensor,
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                                                {formatarData(
                                                    registro.data_hora,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <p className="mt-4 text-sm text-gray-500">
                    O histórico mostra os registros salvos no banco. Na
                    implementação atual, as leituras dos sensores são
                    gravadas quando suas rotas de consulta são acessadas.
                </p>
            </div>
        </div>
    );
}