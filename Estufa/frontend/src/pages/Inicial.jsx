import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuServer, LuExternalLink } from "react-icons/lu";

export default function Inicial() {

    const navigate = useNavigate();

    const [pagina, setPagina] = useState(1);

    const alternarPagina = () => {
        setPagina((paginaAtual) => (paginaAtual === 1 ? 2 : 1));
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-300 via-indigo-300 to-violet-300 text-white font-sans selection:bg-violet-200 selection:text-indigo-900 flex flex-col">

            <div className="flex-1 flex flex-col justify-center">

                <header className="max-w-5xl mx-auto px-6 pt-12 pb-10 text-center flex flex-col items-center justify-center gap-4">

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight mt-2 text-white drop-shadow-md [text-shadow:0_4px_12px_rgba(59,130,246,0.8)]">

                        Bem-vinda ao Espaço do Projeto{" "}

                        <span className="underline decoration-blue-100 underline-offset-8 text-purple-200">
                            WebControle
                        </span>

                    </h1>


                    <p className="text-blue-50 text-base md:text-lg max-w-2xl leading-relaxed font-light mt-2">

                        Um ambiente de estudos do projeto WebControle.
                        Aqui você pode navegar pelos conceitos integrados de
                        controle web IoT.

                    </p>


                    {/* ACESSO À API */}

                    <a
                        href="https://webcontroleapi.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 group flex items-center gap-4 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >

                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">

                            <LuServer className="text-3xl text-white" />

                        </div>


                        <div className="text-left">

                            <p className="text-xs text-blue-100 font-medium">
                                Backend do projeto
                            </p>

                            <p className="text-lg font-bold text-white">
                                Acessar API WebControle
                            </p>

                        </div>


                        <LuExternalLink className="text-2xl text-blue-100 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    </a>

                </header>


                <main className="max-w-7xl mx-auto px-6 pb-12 w-full">

                    <div className="text-center mb-10">

                        <h2 className="text-2xl font-bold tracking-tight text-white [text-shadow:0_4px_12px_rgba(59,130,246,0.8)]">
                            Selecione o módulo para continuar
                        </h2>

                        <p className="text-blue-50/80 text-sm mt-1 font-light">
                            Clique em um dos blocos abaixo para abrir o conteúdo
                            da aula correspondente.
                        </p>

                    </div>


                    <div className="flex items-center justify-between gap-4 w-full">

                        {/* SETA ESQUERDA */}

                        <button
                            type="button"
                            onClick={alternarPagina}
                            className="bg-indigo-500/30 hover:bg-indigo-500/50 p-3 rounded-full border border-white/30 transition-all cursor-pointer shadow-lg active:scale-95 text-white shrink-0 backdrop-blur-md"
                            aria-label="Ver aulas anteriores"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />

                            </svg>

                        </button>


                        <div className="flex-1 max-w-6xl">

                            {pagina === 1 ? (

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                                    {/* AULA 01 */}

                                    <div
                                        onClick={() => navigate("/telaLed")}
                                        className="bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col gap-3 cursor-pointer group text-white"
                                    >

                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold group-hover:bg-white/30 transition-colors">
                                            01
                                        </div>

                                        <h3 className="text-xl font-bold">
                                            Aula 01: Controle de LED
                                        </h3>

                                        <p className="text-blue-50 text-sm leading-relaxed font-light">

                                            Controle de um LED utilizando ESP32 e
                                            comunicação MQTT, permitindo ligar e
                                            desligar o componente remotamente através
                                            de uma interface web.

                                        </p>

                                    </div>


                                    {/* AULA 02 */}

                                    <div
                                        onClick={() => navigate("/telaNivel")}
                                        className="bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col gap-3 cursor-pointer group text-white"
                                    >

                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold group-hover:bg-white/30 transition-colors">
                                            02
                                        </div>

                                        <h3 className="text-xl font-bold">
                                            Aula 02: Nível de Água
                                        </h3>

                                        <p className="text-blue-50 text-sm leading-relaxed font-light">

                                            Monitoramento do nível de água utilizando
                                            ESP32 e comunicação MQTT através de uma
                                            interface web.

                                        </p>

                                    </div>


                                    {/* AULA 03 */}

                                    <div
                                        onClick={() => navigate("/telaUmid")}
                                        className="bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col gap-3 cursor-pointer group text-white"
                                    >

                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold group-hover:bg-white/30 transition-colors">
                                            03
                                        </div>

                                        <h3 className="text-xl font-bold">
                                            Aula 03: Umidade do Solo
                                        </h3>

                                        <p className="text-blue-50 text-sm leading-relaxed font-light">

                                            Monitoramento da umidade do solo utilizando
                                            ESP32, sensor analógico e comunicação MQTT
                                            através de uma interface web.

                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                                    {/* AULA 04 */}

                                    <div
                                        onClick={() => navigate("/telaChuva")}
                                        className="bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col gap-3 cursor-pointer group text-white"
                                    >

                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold group-hover:bg-white/30 transition-colors">
                                            04
                                        </div>

                                        <h3 className="text-xl font-bold">
                                            Aula 04: Radar Chuva
                                        </h3>

                                        <p className="text-blue-50 text-sm leading-relaxed font-light">

                                            Monitoramento do nível da chuva utilizando
                                            ESP32, sensor de chuva e comunicação MQTT,
                                            com acionamento do servo motor para controle
                                            do teto retrátil.

                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* SETA DIREITA */}

                        <button
                            type="button"
                            onClick={alternarPagina}
                            className="bg-indigo-500/30 hover:bg-indigo-500/50 p-3 rounded-full border border-white/30 transition-all cursor-pointer shadow-lg active:scale-95 text-white shrink-0 backdrop-blur-md"
                            aria-label="Ver próximas aulas"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />

                            </svg>

                        </button>

                    </div>


                    {/* INDICADORES */}

                    <div className="flex items-center justify-center gap-2 mt-8">

                        <button
                            type="button"
                            onClick={() => setPagina(1)}
                            aria-label="Abrir primeira página"
                            className={`h-2 rounded-full transition-all duration-300 ${
                                pagina === 1
                                    ? "w-6 bg-indigo-600"
                                    : "w-2 bg-white/40"
                            }`}
                        ></button>


                        <button
                            type="button"
                            onClick={() => setPagina(2)}
                            aria-label="Abrir segunda página"
                            className={`h-2 rounded-full transition-all duration-300 ${
                                pagina === 2
                                    ? "w-6 bg-indigo-600"
                                    : "w-2 bg-white/40"
                            }`}
                        ></button>

                    </div>

                </main>

            </div>


            <footer className="text-center py-6 px-4 text-sm text-blue-50/80 border-t border-white/20">

                Disciplina de Front-end integrada

            </footer>

        </div>
    );
}