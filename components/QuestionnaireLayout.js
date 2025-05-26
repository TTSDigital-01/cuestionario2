// components/QuestionnaireLayout.js
import React from 'react';

export default function QuestionnaireLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-gray-100 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Solo el ícono */}
            <img src="/icono-v1.svg" alt="Ícono TTS Digital" className="h-8" />
            <span className="text-primary-dark font-semibold">Cuestionario de Madurez Digital</span>
          </div>
          <a href="/" className="text-primary-dark hover:text-primary-light font-medium">
            Volver a Inicio
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-primary-dark py-6 mt-auto">
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