// pages/madurez-digital.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuestionnaireLayout from '../components/QuestionnaireLayout';

export default function MadurezDigitalPage() {
  const router = useRouter();
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
  useEffect(() => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 text-center max-w-xl px-4">
            Evalúa tu nivel de madurez digital
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md text-center">
            Selecciona el tamaño de tu empresa para comenzar.
          </p>

          {/* Botones por tamaño */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-6">
            <button
              onClick={() => {
                setTamañoSeleccionado('micro');
                fetch('/data/preguntas-micro.json')
                  .then(res => res.json())
                  .then(data => setPreguntas(data))
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Microempresa.");
                  });
              }}
              className="bg-primary-light text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Microempresa<br />
              <small className="opacity-80">(1–9 empleados)</small>
            </button>
            <button
              onClick={() => {
                setTamañoSeleccionado('pequeña');
                fetch('/data/preguntas-pequenas.json')
                  .then(res => res.json())
                  .then(data => setPreguntas(data))
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
                  .then(res => res.json())
                  .then(data => setPreguntas(data))
                  .catch(err => {
                    console.error('Error al cargar preguntas:', err);
                    alert("No se pudieron cargar las preguntas para Mediana Empresa.");
                  });
              }}
              className="bg-gold text-primary-dark px-6 py-4 rounded-full hover:bg-yellow-400 transition-all"
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4 text-center">
            ¡Gracias por tu interés!
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-md text-center">
            Completar tu evaluación te tomará 10 minutos.
          </p>

          {/* Botones por tamaño */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-6">
            <button
              onClick={() => {
                setTamañoSeleccionado('micro');
                fetch('/data/preguntas-micro.json')
                  .then(res => res.json())
                  .then(data => setPreguntas(data));
              }}
              className="bg-primary-light text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Microempresa<br />
              <small className="opacity-80">(1–9 empleados)</small>
            </button>
            <button
              onClick={() => {
                setTamañoSeleccionado('pequeña');
                fetch('/data/preguntas-pequenas.json')
                  .then(res => res.json())
                  .then(data => setPreguntas(data));
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
                  .then(res => res.json())
                  .then(data => setPreguntas(data));
              }}
              className="bg-gold text-primary-dark px-6 py-4 rounded-full hover:bg-yellow-400 transition-all"
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
          <p className="text-xl font-semibold text-primary-dark mb-6">Cargando cuestionario...</p>
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-light w-1/4 animate-pulse"></div>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  const preguntasDelBloque = areas.length ? preguntas.filter(p => p.area === areas[currentBloque]) : [];
  const preguntaActual = preguntasDelBloque[currentPregunta];

  const calcularPromedioPorArea = (area, respuestas) => {
    const preguntasDeArea = preguntas.filter(p => p.area === area);
    const total = preguntasDeArea.reduce((acc, p) => acc + (respuestas[p.id] || 0), 0);
    return Number((total / preguntasDeArea.length).toFixed(2));
  };

  const getNivel = (promedio) => {
    if (promedio <= 1.5) return "🔴 Tradicional";
    if (promedio <= 2.5) return "🟠 Explorador";
    if (promedio <= 3.5) return "🟡 Emergente";
    return "🟢 Digitalizado";
  };

  const getRecomendacionGeneral = (nivel) => {
    switch(nivel) {
      case "🔴 Tradicional":
        return "Empieza con capacitación básica en herramientas digitales y crea un plan inicial de transformación digital.";
      case "🟠 Explorador":
        return "Implementa herramientas empresariales básicas y empieza a medir métricas clave mensualmente.";
      case "🟡 Emergente":
        return "Conecta tus sistemas actuales y empieza a tomar decisiones basadas en datos históricos.";
      case "🟢 Digitalizado":
        return "Enfócate en escalar eficientemente y proteger tus datos críticos.";
      default:
        return "Revisa los resultados e identifica áreas prioritarias para seguir avanzando.";
    }
  };

  const manejarRespuesta = (id, valor) => {
    const nuevasRespuestas = {
      ...respuestas,
      [id]: valor
    };
    setRespuestas(nuevasRespuestas);

    // Verificar si ya se respondió todo
    const todasRespondidas = Object.keys(nuevasRespuestas).length === preguntas.length;

    if (todasRespondidas) {
      const resultadosPorArea = areas.map(area => {
        const puntaje = calcularPromedioPorArea(area, nuevasRespuestas);
        const nivel = getNivel(puntaje);
        return { area, puntaje, nivel };
      });

      const promedioGeneral = Number(
        (resultadosPorArea.reduce((acc, curr) => acc + curr.puntaje, 0) / resultadosPorArea.length).toFixed(2)
      );

      const nivelGeneral = getNivel(promedioGeneral);
      const recomendacionGeneral = getRecomendacionGeneral(nivelGeneral);

      const fortalezas = resultadosPorArea
        .filter(a => a.puntaje >= 3.5)
        .map(a => a.area);

      const oportunidadesClave = resultadosPorArea
        .filter(a => a.puntaje <= 2.5)
        .map(a => a.area);

      const diagnosticoFinal = {
        nombre,
        empresa,
        tipoEmpresa: tamañoSeleccionado,
        fecha: new Date().toISOString(),
        promedioGeneral,
        nivelGeneral,
        recomendacionGeneral,
        resultadosPorArea,
        fortalezas,
        oportunidadesClave
      };

      // Guardar en sessionStorage
      sessionStorage.setItem('diagnosticoFinal', JSON.stringify(diagnosticoFinal));

      // Redirigir
      setTimeout(() => {
        router.push('/informe');
      }, 500);
    } else {
      // Avanzar normalmente
      if (currentPregunta < preguntasDelBloque.length - 1) {
        setCurrentPregunta(currentPregunta + 1);
      } else {
        if (currentBloque < areas.length - 1) {
          setCurrentBloque(currentBloque + 1);
          setCurrentPregunta(0);
        }
      }
    }
  };

  if (finalizado) {
    return (
      <QuestionnaireLayout>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Diagnóstico Preliminar</h2>
          <p className="mb-8 text-gray-700">
            ¡Has completado el cuestionario! A continuación, se muestran tus resultados por área.
          </p>
        </div>
      </QuestionnaireLayout>
    );
  }

  if (!preguntaActual) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          <p className="text-xl font-semibold text-primary-dark mb-6">
            Cargando pregunta {currentPregunta + 1} del bloque {currentBloque + 1}
          </p>
          <p className="text-lg text-gray-700 mb-10">
            Estamos preparando tu evaluación...
          </p>
        </div>
      </QuestionnaireLayout>
    );
  }

  return (
    <QuestionnaireLayout>
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md border border-gray-200">
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
        <h3 className="text-lg font-medium text-primary-light mb-6">
          {preguntaActual.text}
        </h3>

        {/* Opciones de respuesta */}
        <div className="space-y-3">
          {preguntaActual.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => manejarRespuesta(preguntaActual.id, opt.value)}
              className={`w-full text-left px-4 py-3 rounded-md text-primary-dark ${
                opt.value === 1
                  ? 'hover:bg-red-100 active:bg-red-200'
                  : opt.value === 2
                  ? 'hover:bg-orange-100 active:bg-orange-200'
                  : opt.value === 3
                  ? 'hover:bg-yellow-100 active:bg-yellow-200'
                  : 'hover:bg-green-100 active:bg-green-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </QuestionnaireLayout>
  );
}