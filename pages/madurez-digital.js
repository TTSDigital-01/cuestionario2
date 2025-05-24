// pages/madurez-digital.js

import React, { useState, useEffect } from 'react';
import QuestionnaireLayout from '../components/QuestionnaireLayout';

export default function MadurezDigitalPage() {
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [currentBloque, setCurrentBloque] = useState(0);
  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);

  // Extraer bloques únicos (áreas)
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (preguntas.length > 0) {
      const bloquesUnicos = [...new Set(preguntas.map(p => p.area))];
      setAreas(bloquesUnicos);
    }
  }, [preguntas]);

  const cargarPreguntas = () => {
    fetch('/data/preguntas-micro.json')
      .then(res => res.json())
      .then(data => {
        setPreguntas(data);
      });
  };

  if (!tamañoSeleccionado) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
          <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-8" />

          <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 text-center max-w-xl px-4">
            Evalúa tu nivel digital
          </h1>

          <p className="text-lg text-text-dark-gray max-w-md mx-auto mb-10">
            Selecciona el tamaño de tu empresa para comenzar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-6">
            <button
              onClick={() => {
                setTamañoSeleccionado('micro');
                cargarPreguntas();
              }}
              className="bg-primary-light text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Microempresa<br />
              <small className="opacity-80">(1–9 empleados)</small>
            </button>

            <button
              onClick={() => alert("Próximamente: Preguntas para pequeñas empresas")}
              className="bg-gray-400 text-white px-6 py-4 rounded-full hover:bg-gray-500 transition-all"
            >
              Pequeña Empresa<br />
              <small className="opacity-80">(10–49 empleados)</small>
            </button>

            <button
              onClick={() => alert("Próximamente: Preguntas para medianas empresas")}
              className="bg-gold text-[#1A1A1A] px-6 py-4 rounded-full hover:bg-yellow-400 transition-all"
            >
              Mediana Empresa<br />
              <small className="opacity-80">(50–200 empleados)</small>
            </button>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  if (!preguntas.length) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
          <img src="/logo-sf-1.png" alt="TTS Digital" className="h-24 mb-8" />
          <p className="text-xl font-semibold text-primary-dark mb-6">Cargando cuestionario...</p>
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-dark w-1/4 animate-pulse"></div>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  const preguntasDelBloque = preguntas.filter(p => p.area === areas[currentBloque]);

  // ✅ Validación segura
  const preguntaActual = preguntasDelBloque[currentPregunta];

  if (!preguntaActual) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
          <p className="text-xl font-semibold text-primary-dark mb-6">
            Cargando pregunta {currentPregunta + 1} del bloque {currentBloque + 1}
          </p>
          <p className="text-lg text-text-light_gray">
            Estamos preparando tu evaluación...
          </p>
        </div>
      </QuestionnaireLayout>
    );
  }

  const manejarRespuesta = (id, valor) => {
    const nuevasRespuestas = {
      ...respuestas,
      [id]: valor
    };
    setRespuestas(nuevasRespuestas);

    if (currentPregunta < preguntasDelBloque.length - 1) {
      setCurrentPregunta(currentPregunta + 1);
    } else {
      if (currentBloque < areas.length - 1) {
        setCurrentBloque(currentBloque + 1);
        setCurrentPregunta(0);
      } else {
        setFinalizado(true);
      }
    }
  };

  if (finalizado) {
    const resultadosPorArea = areas.map(area => {
      const preguntasDeArea = preguntas.filter(p => p.area === area);
      const total = preguntasDeArea.reduce((acc, p) => acc + (respuestas[p.id] || 0), 0);
      const promedio = (total / preguntasDeArea.length).toFixed(2);

      let nivel = '';
      if (promedio <= 1.5) nivel = '🔴 Tradicional';
      else if (promedio <= 2.5) nivel = '🟠 Explorador';
      else if (promedio <= 3.5) nivel = '🟡 Emergente';
      else nivel = '🟢 Digitalizado';

      return {
        area,
        promedio,
        nivel
      };
    });

    return (
      <QuestionnaireLayout>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Diagnóstico Preliminar</h2>
          <p className="mb-8 text-text-light_gray">
            ¡Has completado el cuestionario! A continuación, se muestran tus resultados por área.
          </p>

          {/* Tabla de Resultados */}
          <table className="w-full table-auto mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Área Evaluada</th>
                <th className="px-4 py-2 text-center">Puntaje</th>
                <th className="px-4 py-2 text-center">Nivel de Madurez</th>
              </tr>
            </thead>
            <tbody>
              {resultadosPorArea.map((resultado, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border px-4 py-2">{resultado.area}</td>
                  <td className="border px-4 py-2 text-center">{resultado.promedio}</td>
                  <td className="border px-4 py-2 text-center">{resultado.nivel}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botón provisional */}
          <div className="mt-6 text-center">
            <button
              onClick={() => alert("Próximamente: Enviar resultados a Google Sheets")}
              className="bg-primary-light text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all"
            >
              Enviar Resultados por Correo
            </button>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  return (
    <QuestionnaireLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-primary-dark font-medium">
            <span>Bloque {currentBloque + 1} de {areas.length}</span>
            <span>{areas[currentBloque]}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary-light"
              style={{ width: `${((currentBloque + 1) / areas.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Número de pregunta */}
        <div className="mb-4 text-right text-sm text-gray-500">
          Pregunta {currentPregunta + 1} de {preguntasDelBloque.length}
        </div>

        {/* Texto de pregunta */}
        <h3 className="text-lg font-medium text-primary-dark mb-6">
          {preguntaActual.text}
        </h3>

        {/* Opciones de respuesta */}
        <div className="space-y-3">
          {preguntaActual.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => manejarRespuesta(preguntaActual.id, opt.value)}
              className={`w-full text-left px-4 py-3 rounded-md ${
                opt.value === 1
                  ? 'bg-red-100 text-red-700'
                  : opt.value === 2
                  ? 'bg-orange-100 text-orange-700'
                  : opt.value === 3
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Botón siguiente */}
        <div className="mt-8 text-right">
          <button
            onClick={() => {
              if (currentPregunta < preguntasDelBloque.length - 1) {
                setCurrentPregunta(currentPregunta + 1);
              } else {
                if (currentBloque < areas.length - 1) {
                  setCurrentBloque(currentBloque + 1);
                  setCurrentPregunta(0);
                } else {
                  setFinalizado(true);
                }
              }
            }}
            className="bg-primary-light text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
          >
            Siguiente
          </button>
        </div>
      </div>
    </QuestionnaireLayout>
  );
}