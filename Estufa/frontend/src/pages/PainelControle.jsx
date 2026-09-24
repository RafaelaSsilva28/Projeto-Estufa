import React, { useEffect, useState } from "react";

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

  // 🧠 PARTE DA LÓGICA

  // Códigos referentes a UMIDADE DO AR
  const [temperatura, setTemperatura] = useState("Desconhecida");
  const [umidade, setUmidade] = useState("Desconhecida");
  const buscarDadosUmidade = async () => {
    try {
      const resposta = await fetch(
        `${enderecoServidor}/controleUmidade/dadosClima`
      );
      const dadosClima = await resposta.json();
      console.log(`DADOS RECEBIDOS:`, dadosClima.temperatura, dadosClima.umidade);

      setTemperatura(dadosClima.temperatura);
      setUmidade(dadosClima.umidade);
    } catch (error) {
      console.log(`ERRO ao buscar nivel da umidade!`, error);
    }
  };
  useEffect(() => {
    buscarDadosUmidade();

    const intervalo = setInterval(buscarDadosUmidade, 5000);

    return () => clearInterval(intervalo);
  }, []);

  //Códigos referentes ao SENSOR DE CHUVA
  const [statusChuva, setStatusChuva] = useState("Desconhecida");
  const [estadoTelhado, setEstadoTelhado] = useState("Desconhecido");
  const buscardadosChuva = async () => {
    try {
      const resposta = await fetch(
        `${enderecoServidor}/controleChuva/dadosChuva`
      );
      const dadosChuva = await resposta.json();
      console.log(`DADOS RECEBIDOS:`, dadosChuva.statusChuva, dadosChuva.estadoTelhado);

      setStatusChuva(dadosChuva.statusChuva);
      setEstadoTelhado(dadosChuva.estadoTelhado);
    } catch (error) {
      console.log(`ERRO ao buscar os dados de chuva e de telhado!`, error);
    }
  };
  useEffect(() => {
    buscardadosChuva();
    const intervalo = setInterval(buscardadosChuva, 5000);
    return () => clearInterval(intervalo);
  }, []);

  //Códigos referentes ao SENSOR DE MOVIMENTO
  const [presencaDetectada, setPresencaDetectada] = useState("Desconhecida");
  const buscardadosMovimento = async () => {
    try {
      const resposta = await fetch(
        `${enderecoServidor}/controleMovimento/movimento`
      );
      const dadosMovimento = await resposta.json();
      console.log(`DADOS RECEBIDOS:`, dadosMovimento.presencaDetectada);

      setPresencaDetectada(dadosMovimento.presencaDetectada);
    } catch (error) {
      console.log(`ERRO ao buscar os dados de movimentação!`, error);
    }
  };
  useEffect(() => {
    buscardadosMovimento();
    const intervalo = setInterval(buscardadosMovimento, 5000);
    return () => clearInterval(intervalo);
  }, []);

  // 🎨 PARTE VISUAL DA PÁGINA 
  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-250 via-pink-300 to-pink-400 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-3">

            <GiGreenhouse className="text-4xl text-pink-800" />

            <h1 className="text-3xl md:text-4xl font-bold text-pink-950">
              Painel de Controle
            </h1>

          </div>

          <p className="text-gray-600">
            Acompanhe os dados recebidos pelos sensores da estufa.
          </p>

        </div>


        {/* STATUS GERAL */}

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 mb-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm text-gray-500">
                Status do sistema
              </p>

              <h2 className="text-xl font-bold text-pink-900">
                Estufa em funcionamento
              </h2>

            </div>


            <div className="flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full">

              <LuActivity />

              <span className="font-semibold text-sm">
                Online
              </span>

            </div>

          </div>

        </div>


        {/* CARDS DOS SENSORES */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">


          {/* DETECTANDO MOVIMENTO */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">

                <GiPlantRoots className="text-2xl text-pink-700" />

              </div>

              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                PIR
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Movimentação
            </p>

            <h3 className="text-3xl font-bold text-pink-950 mt-1">
              {presencaDetectada}
            </h3>

            <p className="text-sm text-pink-700 mt-3">
              Movimento:
            </p>

          </div>


          {/* UMIDADE DO AR */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">

                <LuDroplets className="text-2xl text-pink-700" />

              </div>

              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                Ambiente
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Umidade do ar
            </p>

            <h3 className="text-3xl font-bold text-pink-950 mt-1">
              {umidade}
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Ambiente:
            </p>

          </div>


          {/* TEMPERATURA */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">

                <LuThermometer className="text-2xl text-pink-700" />

              </div>

              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                Temperatura
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Temperatura
            </p>

            <h3 className="text-3xl font-bold text-pink-950 mt-1">
              {temperatura}
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Temperatura:
            </p>

          </div>


          {/* CHUVA */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">

                <LuCloudRain className="text-2xl text-pink-700" />

              </div>

              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                Chuva
              </span>

            </div>


            <p className="text-gray-500 text-sm">
              Sensor de chuva
            </p>

            <h3 className="text-2xl font-bold text-pink-950 mt-1">
              {statusChuva}
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Telhado: {estadoTelhado}
            </p>

          </div>

        </div>


        {/* INFORMAÇÕES DOS ATUADORES */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">


          {/* SERVO */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-pink-100 rounded-xl flex items-center justify-center">

                <LuGauge className="text-xl text-pink-700" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Servo motor
                </p>

                <h3 className="font-bold text-pink-950">
                  Teto {estadoTelhado}
                </h3>

              </div>

            </div>

          </div>


          {/* COMUNICAÇÃO */}

          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-pink-100 rounded-xl flex items-center justify-center">

                <LuActivity className="text-xl text-pink-700" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Comunicação MQTT
                </p>

                <h3 className="font-bold text-pink-950">
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