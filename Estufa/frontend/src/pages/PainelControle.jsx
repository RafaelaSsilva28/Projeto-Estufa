import React from "react";

export default function PainelControle() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-300 via-indigo-300 to-violet-300 text-white font-sans flex flex-col items-center">

            <h1 className="text-center text-4xl md:text-6xl font-black tracking-tight max-w-4xl leading-tight mt-10 text-white drop-shadow-md [text-shadow:0_4px_12px_rgba(59,130,246,0.8)]">

                Espaço do Projeto

                <span className="block underline decoration-blue-100 underline-offset-8 text-purple-200 mt-4">
                    Monitoramento da Umidade do Solo
                </span>

            </h1>

        </div>
    );
}