// pages/madurez-digital.js

import React, { useState } from 'react';

export default function MadurezDigitalPage() {
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const cargarPreguntas = (tamaño) => {
    fetch(`/data/preguntas-${tamaño}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPreguntas(data);
        setError(null);
      })
      .catch((err) => {
        console.error("🚨 Error al cargar preguntas:", err);
        setError("No se pudieron cargar las preguntas");
      });
  };

  const handleAnswer = (id, value) => {
    const nuevasRespuestas = {
      ...respuestas,
      [id]: value,
    };
    setRespuestas(nuevasRespuestas);

    if (currentQuestion < preguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Aquí puedes calcular puntaje final o enviar a resultados
      console.log("✅ Cuestionario completado", nuevasRespuestas);
    }
  };

  if (!tamañoSeleccionado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-8">Selecciona tu tamaño</h1>
        <button
          onClick={() => {
            setTamañoSeleccionado('micro');
            cargarPreguntas('micro');
          }}
          className="bg-[#0087D1] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
        >
          Microempresa
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>{error}</p>
        <button
          onClick={() => setTamañoSeleccionado(null)}
          className="mt-4 bg-[#0087D1] text-white px-4 py-2 rounded-full"
        >
          Volver a intentar
        </button>
      </div>
    );
  }

  if (!preguntas.length) {
    return <p className="p-6">Cargando preguntas...</p>;
  }

  const preguntaActual = preguntas[currentQuestion];

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1E3A8A] mb-4">
          Pregunta {currentQuestion + 1} de {preguntas.length}
        </h2>
        <p className="mb-6">{preguntaActual.text}</p>

        <div className="space-y-3">
          {preguntaActual.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(preguntaActual.id, opt.value)}
              className={`w-full text-left p-4 rounded-md ${
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
      </div>
    </div>
  );
}