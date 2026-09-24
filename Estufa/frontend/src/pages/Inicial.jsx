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
    <div className="min-h-screen bg-gradient-to-br from-pink-250 via-pink-300 to-pink-400 font-sans text-gray-800">

      {/* CABEÇALHO */}
      <header className="max-w-6xl mx-auto px-6 pt-10 pb-8">

        <div className="flex items-center gap-3 mb-10">

          <div className="w-12 h-12 bg-pink-700 rounded-xl flex items-center justify-center shadow-md">
            <GiGreenhouse className="text-white text-3xl" />
          </div>

          <div>
            <h2 className="font-bold text-xl text-pink-900">
              Projeto Estufa
            </h2>

            <p className="text-sm text-pink-700">
              Sistema de monitoramento
            </p>
          </div>

        </div>


        {/* APRESENTAÇÃO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-pink-700 font-semibold mb-2">
              ESTUFA INTELIGENTE
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-pink-950 leading-tight">
              Monitoramento e controle de uma estufa
            </h1>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
              Projeto desenvolvido para acompanhar as condições da estufa
              utilizando sensores conectados ao ESP32. Os dados são enviados
              por MQTT e podem ser acompanhados através desta aplicação web.
            </p>


            <div className="flex flex-wrap gap-3 mt-7">

              <button
                onClick={() => navigate("/painelControle")}
                className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer shadow-md"
              >
                Ver monitoramento
              </button>


              <a
                href="https://webcontroleapi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-pink-300 text-pink-800 px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 transition shadow-sm"
              >
                Acessar API
                <LuExternalLink />
              </a>

            </div>

          </div>


          {/* REPRESENTAÇÃO DA ESTUFA */}
          <div className="bg-white/70 border border-pink-200 rounded-3xl p-10 shadow-lg flex flex-col items-center justify-center min-h-80">

            <GiGreenhouse className="text-[130px] text-pink-700" />

            <p className="mt-5 font-semibold text-pink-900">
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

          <h2 className="text-2xl font-bold text-pink-950">
            Monitoramento da estufa
          </h2>

          <p className="text-gray-600 mt-1">
            Selecione uma opção para visualizar os dados.
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">


          {/* SENSOR DE MOVIMENTO PIR */}
          <div
            onClick={() => navigate("/painelControle")}
            className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
              <GiPlantRoots className="text-2xl text-pink-700" />
            </div>

            <h3 className="font-bold text-lg text-pink-950">
              Sensor de Movimento
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Acompanhe se existe algum tipo de movimentação aos arredores
            </p>

          </div>


          {/* CHUVA */}
          <div
            onClick={() => navigate("/painelControle")}
            className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
              <LuCloudRain className="text-2xl text-pink-700" />
            </div>

            <h3 className="font-bold text-lg text-pink-950">
              Sensor de chuva
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Detecta a presença de chuva e auxilia no controle do teto.
            </p>

          </div>


          {/* UMIDADE DO AR */}
          <div
            onClick={() => navigate("/painelControle")}
            className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
              <LuDroplets className="text-2xl text-pink-700" />
            </div>

            <h3 className="font-bold text-lg text-pink-950">
              Umidade do ar
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Leitura da umidade presente no ambiente externo da estufa.
            </p>

          </div>


          {/* TEMPERATURA */}
          <div
            onClick={() => navigate("/painelControle")}
            className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
          >

            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
              <LuThermometer className="text-2xl text-pink-700" />
            </div>

            <h3 className="font-bold text-lg text-pink-950">
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

        <div className="bg-pink-800 text-white rounded-3xl p-8 md:p-10 shadow-lg">

          <h2 className="text-2xl font-bold">
            Sobre o projeto
          </h2>

          <p className="mt-4 text-pink-50 leading-relaxed max-w-4xl">
            A estufa utiliza um ESP32 conectado a sensores responsáveis
            por coletar informações do ambiente. A comunicação MQTT permite
            que esses dados sejam enviados para a API e apresentados no
            sistema web, facilitando o acompanhamento das condições da estufa.
          </p>

        </div>

      </section>


      <footer className="border-t border-pink-300 text-center py-5 text-sm text-pink-800">
        Projeto Estufa • SENAI
      </footer>

    </div>
  );
}