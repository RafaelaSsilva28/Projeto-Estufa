import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Inicial from "./Inicial";
import PainelControle from "./PainelControle";

import { MdClose, MdMenu } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiGreenhouse } from "react-icons/gi";


export default function Menu() {

    const [menuAberto, setMenuAberto] = useState(false);

    return (

        <div className="flex min-h-screen font-sans">

            {/* FUNDO ESCURO NO CELULAR */}

            {menuAberto && (

                <div
                    onClick={() => setMenuAberto(false)}
                    className="fixed inset-0 bg-black/40 z-[55] md:hidden"
                ></div>

            )}


            {/* MENU LATERAL */}

            <div
                className={`
                    fixed z-[60] inset-y-0 left-0
                    transform md:relative md:translate-x-0
                    w-64
                    bg-linear-to-b from-pink-800 via-pink-700 to-pink-700
                    text-white
                    p-5
                    transition-transform duration-300 ease-in-out
                    shadow-xl
                    ${menuAberto ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* TÍTULO DO MENU */}

                <div className="flex justify-between items-center mb-8">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">

                            <GiGreenhouse className="text-2xl" />

                        </div>

                        <div>

                            <h2 className="font-bold text-lg">
                                Estufa
                            </h2>

                            <p className="text-xs text-pink-100">
                                Monitoramento
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={() => setMenuAberto(false)}
                        className="md:hidden hover:bg-white/10 p-1 rounded-lg"
                    >

                        <MdClose className="w-6 h-6" />

                    </button>

                </div>


                {/* LINKS */}

                <nav className="space-y-3">

                    {/* HOME */}

                    <Link
                        onClick={() => setMenuAberto(false)}
                        to="/"
                        className="
                            flex items-center gap-4
                            hover:bg-white/15
                            p-3
                            rounded-xl
                            transition-colors
                        "
                    >

                        <HiOutlineHome className="text-2xl shrink-0" />

                        <span>
                            Início
                        </span>

                    </Link>


                    {/* PAINEL */}

                    <Link
                        onClick={() => setMenuAberto(false)}
                        to="/painelControle"
                        className="
                            flex items-center gap-4
                            hover:bg-white/15
                            p-3
                            rounded-xl
                            transition-colors
                        "
                    >

                        <LuLayoutDashboard className="text-2xl shrink-0" />

                        <span>
                            Painel de Controle
                        </span>

                    </Link>

                </nav>


                {/* TEXTO NO FINAL */}

                <div className="absolute bottom-5 left-5 right-5">

                    <div className="border-t border-white/20 pt-4">

                        <p className="text-xs text-pink-100">
                            Projeto Estufa
                        </p>

                        <p className="text-xs text-pink-200">
                            ESP32 + MQTT
                        </p>

                    </div>

                </div>

            </div>


            {/* CONTEÚDO DAS PÁGINAS */}

            <div className="flex-1 text-black w-full overflow-auto relative">

                {/* BOTÃO MENU NO CELULAR */}

                <button
                    onClick={() => setMenuAberto(true)}
                    className="
                        md:hidden
                        fixed top-5 left-4
                        z-50
                        bg-pink-800
                        text-white
                        p-2
                        rounded-xl
                        shadow-lg
                    "
                >

                    <MdMenu className="w-7 h-7" />

                </button>


                <Routes>

                    <Route
                        path="/"
                        element={<Inicial />}
                    />

                    <Route
                        path="/painelControle"
                        element={<PainelControle />}
                    />

                </Routes>

            </div>

        </div>
    );
}