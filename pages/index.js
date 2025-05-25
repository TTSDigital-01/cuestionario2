// pages/index.js

import React from 'react';
import Head from 'next/head';

export default function Home() {
  const [nombre, setNombre] = React.useState('');
  const [empresa, setEmpresa] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !empresa.trim() || !email.trim()) {
      alert("Por favor llena todos los campos.");
      return;
    }

    // Guardar temporalmente los datos en sessionStorage o pasarlos por URL/state
    const datosCliente = {
      nombre,
      empresa,
      email
    };

    sessionStorage.setItem('cliente', JSON.stringify(datosCliente));

    // Redirigir a la selección de tamaño de empresa
    window.location.href = '/madurez-digital';
  };

  return (
    <>
      <Head>
        <title>Evaluación de Madurez Digital</title>
        <meta name="description" content="Evalúa el nivel digital de tu empresa" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <img src="/icono-v1.svg" alt="TTS Digital" className="h-12 mb-6" />

        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4 max-w-xl">
          Evalúa tu nivel de madurez digital
        </h1>

        {/* Subtítulo */}
        <p className="text-lg text-[#4A4A4A] mb-8 max-w-md">
          Comienza con esta evaluación gratuita y recibe un informe completo con recomendaciones personalizadas.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#f3f4f6] p-6 rounded-lg shadow-sm border border-gray-200">
          <label htmlFor="nombre" className="block text-left text-[#1E3A8A] font-medium mb-2">
            Tu nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0087D1] mb-4 text-[#4A4A4A]"
          />

          <label htmlFor="empresa" className="block text-left text-[#1E3A8A] font-medium mb-2">
            Nombre de la empresa
          </label>
          <input
            id="empresa"
            type="text"
            placeholder="Ej. Mi Empresa S.A."
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0087D1] mb-4 text-[#4A4A4A]"
          />

          <label htmlFor="email" className="block text-left text-[#1E3A8A] font-medium mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0087D1] mb-6 text-[#4A4A4A]"
          />

          <button
            type="submit"
            className="bg-[#FFD700] text-[#1E3A8A] w-full py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all"
          >
            Empezar
          </button>
        </form>
      </div>
    </>
  );
}