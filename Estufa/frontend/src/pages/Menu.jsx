import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

import Inicial from "./Inicial";
import PainelControle from "./PainelControle";
import Temperatura from "./Temperatura";
import Umidade from "./Umidade";
import Chuva from "./Chuva";
import Movimento from "./Movimento";
import Historico from "./Historico";

import { MdClose, MdMenu } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import {
    LuLayoutDashboard,
    LuThermometer,
    LuDroplets,
    LuCloudRain,
    LuActivity,
    LuHistory,
} from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";

export default function Menu() {
    const [menuAberto, setMenuAberto] = useState(false);

    const paginas = [
        {
            caminho: "/",
            nome: "Início",
            Icone: HiOutlineHome,
        },
        {
            caminho: "/painelControle",
            nome: "Painel de Controle",
            Icone: LuLayoutDashboard,
        },
        {
            caminho: "/temperatura",
            nome: "Temperatura",
            Icone: LuThermometer,
        },
        {
            caminho: "/umidade",
            nome: "Umidade do ar",
            Icone: LuDroplets,
        },
        {
            caminho: "/chuva",
            nome: "Chuva",
            Icone: LuCloudRain,
        },
        {
            caminho: "/movimento",
            nome: "Movimento",
            Icone: LuActivity,
        },
        {
            caminho: "/historico",
            nome: "Histórico",
            Icone: LuHistory,
        },
    ];

    return (
        <div className="flex min-h-screen font-sans">
            {/* FUNDO ESCURO NO CELULAR */}
            {menuAberto && (
                <div
                    onClick={() => setMenuAberto(false)}
                    className="fixed inset-0 z-[55] bg-black/40 md:hidden"
                />
            )}

            {/* MENU LATERAL */}
            <aside
                id="menu-lateral"
                className={`
                    fixed inset-y-0 left-0 z-[60]
                    flex w-64 shrink-0 flex-col
                    bg-linear-to-b from-pink-800 via-pink-700 to-pink-700
                    p-5 text-white shadow-xl
                    transition-transform duration-300 ease-in-out
                    md:sticky md:top-0 md:h-screen md:translate-x-0
                    ${menuAberto ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* TÍTULO */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                            <GiGreenhouse className="text-2xl" />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">
                                Estufa
                            </h2>
                            <p className="text-xs text-pink-100">
                                Monitoramento
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Fechar menu"
                        onClick={() => setMenuAberto(false)}
                        className="rounded-lg p-1 hover:bg-white/10 md:hidden"
                    >
                        <MdClose className="h-6 w-6" />
                    </button>
                </div>

                {/* LINKS DAS PÁGINAS */}
                <nav
                    aria-label="Menu principal"
                    className="flex-1 space-y-3 overflow-y-auto"
                >
                    {paginas.map(({ caminho, nome, Icone }) => (
                        <NavLink
                            key={caminho}
                            to={caminho}
                            end
                            onClick={() => setMenuAberto(false)}
                            className={({ isActive }) => `
                                flex items-center gap-4 rounded-xl p-3
                                transition-colors
                                ${
                                    isActive
                                        ? "bg-white/20 font-semibold"
                                        : "hover:bg-white/15"
                                }
                            `}
                        >
                            <Icone className="shrink-0 text-2xl" />
                            <span>{nome}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* RODAPÉ */}
                <div className="mt-6 border-t border-white/20 pt-4">
                    <p className="text-xs text-pink-100">
                        Projeto Estufa
                    </p>
                    <p className="text-xs text-pink-200">
                        ESP32 + MQTT
                    </p>
                </div>
            </aside>

            {/* CONTEÚDO DAS PÁGINAS */}
            <main className="relative min-w-0 flex-1 text-black">
                <button
                    type="button"
                    aria-label="Abrir menu"
                    aria-controls="menu-lateral"
                    aria-expanded={menuAberto}
                    onClick={() => setMenuAberto(true)}
                    className="fixed left-4 top-5 z-50 rounded-xl bg-pink-800 p-2 text-white shadow-lg md:hidden"
                >
                    <MdMenu className="h-7 w-7" />
                </button>

                <Routes>
                    <Route path="/" element={<Inicial />} />

                    <Route
                        path="/painelControle"
                        element={<PainelControle />}
                    />

                    <Route
                        path="/temperatura"
                        element={<Temperatura />}
                    />

                    <Route
                        path="/umidade"
                        element={<Umidade />}
                    />

                    <Route
                        path="/chuva"
                        element={<Chuva />}
                    />

                    <Route
                        path="/movimento"
                        element={<Movimento />}
                    />

                    <Route
                        path="/historico"
                        element={<Historico />}
                    />
                </Routes>
            </main>
        </div>
    );
}