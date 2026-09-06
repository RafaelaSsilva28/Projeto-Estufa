import React from "react";

import {
  LuCloudRain,
  LuThermometer,
  LuDroplets,
  LuGauge,
  LuActivity
} from "react-icons/lu";

import {
  GiPlantRoots,
  GiGreenhouse
} from "react-icons/gi";


export default function PainelControle() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-3">

            <GiGreenhouse className="text-4xl text-green-800" />

            <h1 className="text-3xl md:text-4xl font-bold text-green-950">
              Painel de Controle
            </h1>

          </div>

          <p className="text-gray-600">
            Acompanhe os dados recebidos pelos sensores da estufa.
          </p>

        </div>


        {/* STATUS GERAL */}

        <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 mb-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm text-gray-500">
                Status do sistema
              </p>

              <h2 className="text-xl font-bold text-green-900">
                Estufa em funcionamento
              </h2>

            </div>


            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">

              <LuActivity />

              <span className="font-semibold text-sm">
                Online
              </span>

            </div>

          </div>

        </div>


        {/* CARDS DOS SENSORES */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">


          {/* UMIDADE DO SOLO */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">

                <GiPlantRoots className="text-2xl text-green-700" />

              </div>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Solo
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Umidade do solo
            </p>

            <h3 className="text-3xl font-bold text-green-950 mt-1">
              65%
            </h3>

            <p className="text-sm text-green-700 mt-3">
              Solo úmido
            </p>

          </div>


          {/* UMIDADE DO AR */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">

                <LuDroplets className="text-2xl text-cyan-700" />

              </div>

              <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">
                Ambiente
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Umidade do ar
            </p>

            <h3 className="text-3xl font-bold text-green-950 mt-1">
              72%
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Ambiente estável
            </p>

          </div>


          {/* TEMPERATURA */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">

                <LuThermometer className="text-2xl text-orange-700" />

              </div>

              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                Temperatura
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Temperatura
            </p>

            <h3 className="text-3xl font-bold text-green-950 mt-1">
              26°C
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Temperatura adequada
            </p>

          </div>


          {/* CHUVA */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">

                <LuCloudRain className="text-2xl text-blue-700" />

              </div>

              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Chuva
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Sensor de chuva
            </p>

            <h3 className="text-2xl font-bold text-green-950 mt-1">
              Sem chuva
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Teto fechado
            </p>

          </div>

        </div>


        {/* INFORMAÇÕES DOS ATUADORES */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">


          {/* SERVO */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">

                <LuGauge className="text-xl text-purple-700" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Servo motor
                </p>

                <h3 className="font-bold text-green-950">
                  Teto fechado
                </h3>

              </div>

            </div>

          </div>


          {/* COMUNICAÇÃO */}

          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">

                <LuActivity className="text-xl text-green-700" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Comunicação MQTT
                </p>

                <h3 className="font-bold text-green-950">
                  Conectado
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}