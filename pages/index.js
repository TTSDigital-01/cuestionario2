// pages/index.js

import React from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = React.useState('');
  const [empezado, setEmpezado] = React.useState(false);

  if (empezado) {
    // Aquí irá la redirección o estado inicial del cuestionario
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <p className="text-lg text-[#1E3A8A] mb-6">¡Gracias por tu interés!</p>
        <p className="text-base text-gray-600 mb-8 max-w-md">
          Hemos guardado tu correo: <strong>{email}</strong>
        </p>
        <button
          onClick={() => window.location.href = "/madurez-digital"}
          className="bg-[#FFD700] text-[#1E3A8A] px-6 py-2 rounded-full hover:bg-yellow-400 transition-all"
        >
          Empezar evaluación
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Evaluación de Madurez Digital</title>
        <meta name="description" content="Evalúa el nivel digital de tu empresa" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-32 mb-8" />

        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-8 max-w-xl">
          Bienvenido a la Evaluación de Madurez Digital para tu Empresa
        </h1>

        {/* Campo de correo */}
        <div className="w-full max-w-md bg-[#f3f4f6] p-6 rounded-lg shadow-sm border border-gray-200">
          <label htmlFor="email" className="block text-[#1E3A8A] font-medium mb-3">
            Ingresa tu correo electrónico para comenzar
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0087D1] mb-4 text-[#4A4A4A]"
          />
          <button
            onClick={() => {
              if (email.includes("@")) {
                setEmpezado(true);
              } else {
                alert("Por favor ingresa un correo válido.");
              }
            }}
            className="bg-[#FFD700] text-[#1E3A8A] w-full py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all"
          >
            Empezar
          </button>
        </div>
      </div>
    </>
  );
}