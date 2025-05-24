// components/QuestionnaireLayout.js

import React from 'react';

export default function QuestionnaireLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-[#f3f4f6] shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Solo el ícono */}
            <img src="/icono-v1.svg" alt="Ícono TTS Digital" className="h-8" />
            <span className="text-[#1E3A8A] font-semibold">Cuestionario de Madurez Digital</span>
          </div>
          <a href="/" className="text-[#1E3A8A] hover:text-[#0087D1] font-medium">
            Volver a Inicio
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#1E3A8A] py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-white text-sm">
          <p>© {new Date().getFullYear()} TTS Digital. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs opacity-90">
            Desarrollado con ❤️ por TTS Digital
          </p>
        </div>
      </footer>
    </div>
  );
}