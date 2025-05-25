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

  // Datos iniciales del cliente
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');

  // Extraer bloques únicos (áreas)
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (preguntas.length > 0) {
      const bloquesUnicos = [...new Set(preguntas.map(p => p.area))];
      setAreas(bloquesUnicos);
    }
  }, [preguntas]);

  // Recuperar datos desde sessionStorage si existen
  React.useEffect(() => {
    const clienteData = sessionStorage.getItem('cliente');
    if (clienteData) {
      const parsed = JSON.parse(clienteData);
      setNombre(parsed.nombre || '');
      setEmpresa(parsed.empresa || '');
      setEmail(parsed.email || '');
    }
  }, []);

  if (!nombre || !empresa || !email) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-8" />

          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6 text-center max-w-xl px-4">
            Evalúa tu nivel de madurez digital
          </h1>

          <p className="text-lg text-[#4A4A4A] mb-8 max-w-md">
            Selecciona el tamaño de tu empresa para comenzar.
          </p>

          {/* Botones por tamaño */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-6">
            <button
              onClick={() => {
                setTamañoSeleccionado('micro');
                fetch('/data/preguntas-micro.json')
                  .then(res => res.json())
                  .then(data => {
                    setPreguntas(data);
                  });
              }}
              className="bg-[#0087D1] text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Microempresa<br />
              <small className="opacity-80">(1–9 empleados)</small>
            </button>

            <button
              onClick={() => {
                setTamañoSeleccionado('pequeña');
                fetch('/data/preguntas-pequenas.json')
                  .then(res => res.json())
                  .then(data => {
                    setPreguntas(data);
                  })
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Pequeña Empresa.");
                  });
              }}
              className="bg-gray-400 text-white px-6 py-4 rounded-full hover:bg-gray-500 transition-all"
            >
              Pequeña Empresa<br />
              <small className="opacity-80">(10–49 empleados)</small>
            </button>

            <button
              onClick={() => {
                setTamañoSeleccionado('mediana');
                fetch('/data/preguntas-medianas.json')
                  .then(res => {
                    if (!res.ok) throw new Error('Error al cargar preguntas-medianas.json');
                    return res.json();
                  })
                  .then(data => {
                    setPreguntas(data);
                  })
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Mediana Empresa.");
                  });
              }}
              className="bg-gold text-[#1E3A8A] px-6 py-4 rounded-full hover:bg-yellow-400 transition-all"
            >
              Mediana Empresa<br />
              <small className="opacity-80">(50–200 empleados)</small>
            </button>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  // Pantalla intermedia – ¡Gracias por tu interés!
  if (!tamañoSeleccionado) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          {/* Logo */}
          <img src="/icono-v1.svg" alt="Ícono TTS Digital" className="h-12 mb-6" />

          {/* Mensaje principal */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-4 text-center">
            ¡Gracias por tu interés!
          </h2>

          <p className="text-lg text-[#4A4A4A] mb-8 max-w-md text-center">
            Completar tu evaluación te tomará 10 minutos.
          </p>

          {/* Botones por tamaño */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-6">
            <button
              onClick={() => {
                setTamañoSeleccionado('micro');
                fetch('/data/preguntas-micro.json')
                  .then(res => res.json())
                  .then(data => {
                    setPreguntas(data);
                  });
              }}
              className="bg-[#0087D1] text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Microempresa<br />
              <small className="opacity-80">(1–9 empleados)</small>
            </button>

            <button
              onClick={() => {
                setTamañoSeleccionado('pequeña');
                fetch('/data/preguntas-pequenas.json')
                  .then(res => res.json())
                  .then(data => {
                    setPreguntas(data);
                  })
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Pequeña Empresa.");
                  });
              }}
              className="bg-gray-400 text-white px-6 py-4 rounded-full hover:bg-gray-500 transition-all"
            >
              Pequeña Empresa<br />
              <small className="opacity-80">(10–49 empleados)</small>
            </button>

            <button
              onClick={() => {
                setTamañoSeleccionado('mediana');
                fetch('/data/preguntas-medianas.json')
                  .then(res => {
                    if (!res.ok) throw new Error('Error al cargar preguntas-medianas.json');
                    return res.json();
                  })
                  .then(data => {
                    setPreguntas(data);
                  })
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Mediana Empresa.");
                  });
              }}
              className="bg-gold text-[#1E3A8A] px-6 py-4 rounded-full hover:bg-yellow-400 transition-all"
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
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          <img src="/logo-sf-1.png" alt="TTS Digital" className="h-24 mb-8" />
          <p className="text-xl font-semibold text-[#1E3A8A] mb-6">Cargando cuestionario...</p>
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#0087D1] w-1/4 animate-pulse"></div>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  const preguntasDelBloque = preguntas.filter(p => p.area === areas[currentBloque]);
  const preguntaActual = preguntasDelBloque[currentPregunta];

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
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Diagnóstico Preliminar</h2>
          <p className="mb-8 text-[#4A4A4A]">
            ¡Has completado el cuestionario! A continuación, se muestran tus resultados por área.
          </p>

          {/* Tabla de Resultados */}
          <table className="w-full table-auto mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-[#1E3A8A] font-semibold">Área Evaluada</th>
                <th className="px-4 py-2 text-center text-[#1E3A8A] font-semibold">Puntaje</th>
                <th className="px-4 py-2 text-center text-[#1E3A8A] font-semibold">Nivel de Madurez</th>
              </tr>
            </thead>
            <tbody>
              {resultadosPorArea.map((resultado, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border px-4 py-2 text-[#4A4A4A]">{resultado.area}</td>
                  <td className="border px-4 py-2 text-center text-[#4A4A4A]">{resultado.promedio}</td>
                  <td className="border px-4 py-2 text-center">{resultado.nivel}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botón final */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                alert("Redirigiendo a /informe...");
              }}
              className="bg-[#FFD700] text-[#1E3A8A] px-6 py-3 rounded-full hover:bg-yellow-400 transition-all"
            >
              Generar Informe
            </button>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  if (!preguntaActual) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          <p className="text-xl font-semibold text-[#1E3A8A] mb-6">
            Cargando pregunta {currentPregunta + 1} del bloque {currentBloque + 1}
          </p>
          <p className="text-lg text-[#4A4A4A] mb-10">
            Estamos preparando tu evaluación...
          </p>
        </div>
      </QuestionnaireLayout>
    );
  }

  return (
    <QuestionnaireLayout>
      <div className="max-w-3xl mx-auto p-6 bg-[#f3f4f6] rounded-lg shadow-md border border-gray-200">

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#1E3A8A] font-medium">
            <span>Bloque {currentBloque + 1} de {areas.length}</span>
            <span>{areas[currentBloque]}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-[#0087D1]"
              style={{ width: `${((currentBloque + 1) / areas.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Número de pregunta */}
        <div className="mb-4 text-right text-sm text-gray-500">
          Pregunta {currentPregunta + 1} de {preguntasDelBloque.length}
        </div>

        {/* Texto de pregunta */}
        <h3 className="text-lg font-medium text-[#0087D1] mb-6">
          {preguntaActual.text}
        </h3>

        {/* Opciones de respuesta */}
        <div className="space-y-3">
          {preguntaActual.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => manejarRespuesta(preguntaActual.id, opt.value)}
              className={`w-full text-left px-4 py-3 rounded-md text-[#1E3A8A] ${
                opt.value === 1
                  ? 'hover:bg-red-100 active:bg-red-200'
                  : opt.value === 2
                  ? 'hover:bg-orange-100 active:bg-orange-200'
                  : opt.value === 3
                  ? 'hover:bg-yellow-100 active:bg-yellow-200'
                  : 'hover:bg-green-100 active:bg-green-200'
              }`}
              style={{
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (opt.value === 1) e.target.style.backgroundColor = '#FF0000';
                if (opt.value === 2) e.target.style.backgroundColor = '#ffb235';
                if (opt.value === 3) e.target.style.backgroundColor = '#FFFF00';
                if (opt.value === 4) e.target.style.backgroundColor = '#58d663';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = opt.value === 1 ? '#fff5f5' :
                                              opt.value === 2 ? '#fff8f1' :
                                              opt.value === 3 ? '#fefce8' :
                                              '#f0fdf4';
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </QuestionnaireLayout>
  );
}