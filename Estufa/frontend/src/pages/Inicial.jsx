import { useNavigate } from "react-router-dom";

import {
  GiGreenhouse,
  GiPlantRoots
} from "react-icons/gi";

import {
  LuCloudRain,
  LuThermometer,
  LuDroplets,
  LuExternalLink
} from "react-icons/lu";

export default function Inicial() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 font-sans text-gray-800">

      {/* CABEÇALHO */}
      <header className="max-w-6xl mx-auto px-6 pt-10 pb-8">

        <div className="flex items-center gap-3 mb-10">

          <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center shadow-md">
            <GiGreenhouse className="text-white text-3xl" />
          </div>

          <div>
            <h2 className="font-bold text-xl text-green-900">
              Projeto Estufa
            </h2>

            <p className="text-sm text-green-700">
              Sistema de monitoramento
            </p>
          </div>

        </div>


        {/* APRESENTAÇÃO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-green-700 font-semibold mb-2">
              ESTUFA INTELIGENTE
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-green-950 leading-tight">
              Monitoramento e controle de uma estufa
            </h1>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
              Projeto desenvolvido para acompanhar as condições da estufa
              utilizando sensores conectados ao ESP32. Os dados são enviados
              por MQTT e podem ser acompanhados através desta aplicação web.
            </p>


            <div className="flex flex-wrap gap-3 mt-7">

              <button
                onClick={() => navigate("/telaUmid")}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer shadow-md"
              >
                Ver monitoramento
              </button>


              <a
                href="https://webcontroleapi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-green-300 text-green-800 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition shadow-sm"
              >
                Acessar API
                <LuExternalLink />
              </a>

            </div>

          </div>


          {/* REPRESENTAÇÃO DA ESTUFA */}
          <div className="bg-white/70 border border-green-200 rounded-3xl p-10 shadow-lg flex flex-col items-center justify-center min-h-80">

            <GiGreenhouse className="text-[130px] text-green-700" />

            <p className="mt-5 font-semibold text-green-900">
              Estufa automatizada
            </p>

            <p className="text-sm text-gray-500 text-center mt-2">
              Sensores e atuadores integrados ao ESP32
            </p>

          </div>

        </div>

      </header>


      {/* MÓDULOS */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-7">

          <h2 className="text-2xl font-bold text-green-950">
            Monitoramento da estufa
          </h2>

          <p className="text-gray-600 mt-1">
            Selecione uma opção para visualizar os dados.
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">


          {/* UMIDADE */}
          <div
            onClick={() => navigate("/telaUmid")}
            className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
              <GiPlantRoots className="text-2xl text-green-700" />
            </div>

            <h3 className="font-bold text-lg text-green-950">
              Umidade do solo
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Acompanhe o nível de umidade do solo da estufa.
            </p>

          </div>


          {/* CHUVA */}
          <div
            onClick={() => navigate("/telaChuva")}
            className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <LuCloudRain className="text-2xl text-blue-700" />
            </div>

            <h3 className="font-bold text-lg text-green-950">
              Sensor de chuva
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Detecta a presença de chuva e auxilia no controle do teto.
            </p>

          </div>


          {/* UMIDADE DO AR */}
          <div
            className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-5">
              <LuDroplets className="text-2xl text-cyan-700" />
            </div>

            <h3 className="font-bold text-lg text-green-950">
              Umidade do ar
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Leitura da umidade presente no ambiente interno da estufa.
            </p>

          </div>


          {/* TEMPERATURA */}
          <div
            className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
              <LuThermometer className="text-2xl text-orange-700" />
            </div>

            <h3 className="font-bold text-lg text-green-950">
              Temperatura
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Consulte a temperatura do ambiente monitorado.
            </p>

          </div>

        </div>

      </main>


      {/* SOBRE O PROJETO */}
      <section className="max-w-6xl mx-auto px-6 pb-14">

        <div className="bg-green-800 text-white rounded-3xl p-8 md:p-10 shadow-lg">

          <h2 className="text-2xl font-bold">
            Sobre o projeto
          </h2>

          <p className="mt-4 text-green-50 leading-relaxed max-w-4xl">
            A estufa utiliza um ESP32 conectado a sensores responsáveis
            por coletar informações do ambiente. A comunicação MQTT permite
            que esses dados sejam enviados para a API e apresentados no
            sistema web, facilitando o acompanhamento das condições da estufa.
          </p>

        </div>

      </section>


      <footer className="border-t border-green-300 text-center py-5 text-sm text-green-800">
        Projeto Estufa • SENAI
      </footer>

    </div>
  );
}