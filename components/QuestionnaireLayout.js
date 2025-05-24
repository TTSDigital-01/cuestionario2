// components/QuestionnaireLayout.js

import React from 'react';

export default function QuestionnaireLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/ICONO FINAL V1.svg" alt="TTS Digital Icono" className="h-8" />
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
      <footer className="border-t border-gray-200 bg-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-text-light_gray text-sm">
          <p>© {new Date().getFullYear()} TTS Digital. Todos los derechos reservados.</p>
          <p className="mt-2">
            <a href="/politica-de-privacidad" className="underline hover:text-primary-dark">
              Política de Privacidad
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}