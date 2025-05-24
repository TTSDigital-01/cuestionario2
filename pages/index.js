// pages/index.js

import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Evaluación de Madurez Digital</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#b0b2bc] text-center">
        {/* Logo */}
        <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-8" />

        {/* Títulos */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 max-w-xl px-4">
          Bienvenido a la Evaluación de Madurez Digital para tu Empresa
        </h1>
        <p className="text-xl font-semibold text-primary-dark mb-10 max-w-md px-4">
          Digitaliza, Crece, Transforma, Gana
        </p>

        {/* Botón de inicio */}
        <button
          onClick={() => window.location.href = "/madurez-digital"}
          className="bg-primary-light text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all"
        >
          Empezar
        </button>
      </div>
    </>
  );
}