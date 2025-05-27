// pages/informe.js - Versión 11
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionnaireLayout from '../components/QuestionnaireLayout';

// Importar Chart.js y plugin para etiquetas
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registrar componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Importar botón de descarga PDF
import PdfDownloadButton from '../components/PdfDownloadButton';

export default function InformePage() {
  const router = useRouter();
  const [diagnostico, setDiagnostico] = useState(null);
  const [generandoPDF, setGenerandoPDF] = useState(false);

  // Cargar diagnóstico desde sessionStorage
  useEffect(() => {
    const datosGuardados = sessionStorage.getItem('diagnosticoFinal');
    if (!datosGuardados) {
      router.push('/madurez-digital');
      return;
    }
    const parsed = JSON.parse(datosGuardados);
    setDiagnostico(parsed);
  }, []);

  // Enviar diagnóstico a Google Sheets cuando esté cargado
  useEffect(() => {
    if (diagnostico) {
      enviarADiagnosticoSheets();
    }
  }, [diagnostico]);

  const enviarADiagnosticoSheets = async () => {
    if (!diagnostico) return;

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzP5kRrpDBY6JgArIfELBpNUerfxFCiL-H9M1q5ooDPSnsIK001X9ZQqFDH_0R4GRj_/exec ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(diagnostico)
      });

      if (response.ok) {
        console.log('✅ Diagnóstico enviado exitosamente a Google Sheets');
      } else {
        console.error('❌ Error HTTP al enviar a Google Sheets:', response.status);
      }
    } catch (error) {
      console.error('⚠️ Error al enviar diagnóstico:', error.message);
    }
  };

  if (!diagnostico) {
    return (
      <QuestionnaireLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white">
          <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-8" />
          <p className="text-xl font-semibold text-primary-dark">Cargando informe...</p>
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-primary-light w-1/2 animate-pulse"></div>
          </div>
        </div>
      </QuestionnaireLayout>
    );
  }

  const {
    nombre,
    empresa,
    tipoEmpresa,
    fecha,
    promedioGeneral,
    nivelGeneral,
    recomendacionGeneral,
    resultadosPorArea,
    fortalezas,
    oportunidadesClave
  } = diagnostico;

  const fechaFormateada = new Date(fecha).toLocaleDateString('es-EC');

  // Datos del gráfico comparativo
  const dataComparativo = {
    labels: resultadosPorArea.map(r => r.area),
    datasets: [
      {
        label: "Tu Puntaje",
        data: resultadosPorArea.map(r => r.puntaje),
        backgroundColor: '#FFD700',
        borderRadius: 4,
        barPercentage: 0.6
      },
      {
        label: "Promedio Sectorial",
        data: resultadosPorArea.map(r => {
          if (tipoEmpresa === "micro") return 2.2;
          if (tipoEmpresa === "pequeña") return 3.0;
          if (tipoEmpresa === "mediana") return 3.8;
          return 2.5;
        }),
        backgroundColor: '#b0b2bc',
        borderRadius: 4,
        barPercentage: 0.6
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 4,
        ticks: {
          callback: val => val.toFixed(1)
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#1E3A8A',
        formatter: value => value.toFixed(1)
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <QuestionnaireLayout>
      {/* Contenedor principal del informe */}
      <div id="informe-contenido" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
        {/* Encabezado Institucional */}
        <div className="flex flex-col items-center justify-center text-center py-8 bg-white border-b border-gray-200">
          <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-6" />
          <h1 className="text-3xl font-bold text-primary-dark mb-4">Diagnóstico de Madurez Digital</h1>
          <p className="text-lg text-gray-600">Informe generado el {fechaFormateada}</p>
        </div>

        {/* Datos del Cliente */}
        <div className="bg-gray-50 rounded-lg shadow-md border border-blue-100 p-6 my-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div>
              <label className="block text-sm text-gray-500">Nombre</label>
              <p className="font-medium text-primary-dark">{nombre}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Empresa</label>
              <p className="font-medium text-primary-dark">{empresa}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Tamaño de Empresa</label>
              <p className="font-medium text-primary-dark capitalize">{tipoEmpresa}</p>
            </div>
          </div>
        </div>

        {/* Diagnóstico General */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">Diagnóstico General</h2>
          <p className="mb-6 text-gray-700">
            Tu empresa tiene un puntaje promedio de{' '}
            <strong>{parseFloat(promedioGeneral).toFixed(2)}</strong> de 4 posibles.
          </p>
          <p className="mb-6 text-gray-700">
            <strong>Nivel General:</strong> {nivelGeneral}
          </p>
        </div>

        {/* Explicación de niveles de madurez digital */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">¿Qué significan los niveles de madurez digital?</h3>
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li><span className="text-red-600">🔴 Tradicional:</span> La empresa opera con procesos manuales, sin visión ni estrategia digital definida.</li>
            <li><span className="text-orange-500">🟠 Explorador:</span> Hay interés en transformarse digitalmente, pero aún falta planificación estratégica y seguimiento constante.</li>
            <li><span className="text-yellow-500">🟡 Emergente:</span> Se han adoptado herramientas digitales básicas, con cierta automatización y análisis de datos históricos.</li>
            <li><span className="text-green-600">🟢 Digitalizado:</span> Los sistemas están conectados, las decisiones se toman con base en datos y hay un enfoque integrado y proactivo.</li>
          </ul>
        </div>

        {/* Recomendación General */}
        <div className="bg-blue-50 rounded-lg border-l-4 border-primary-dark p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-dark mb-4">Recomendación General</h2>
          <p className="text-gray-700 leading-relaxed">{recomendacionGeneral}</p>
        </div>

        {/* Tabla de Resultados por Área */}
        <div className="overflow-x-auto mb-10">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">Resultados por Bloque</h3>
          <table className="w-full table-auto mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-primary-dark font-semibold">Área Evaluada</th>
                <th className="px-4 py-2 text-center text-primary-dark font-semibold">Puntaje</th>
                <th className="px-4 py-2 text-center text-primary-dark font-semibold">Nivel de Madurez</th>
              </tr>
            </thead>
            <tbody>
              {resultadosPorArea.map((resultado, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border px-4 py-2 text-gray-700">{resultado.area}</td>
                  <td className="border px-4 py-2 text-center text-gray-700">{parseFloat(resultado.puntaje).toFixed(2)}</td>
                  <td className="border px-4 py-2 text-center">{resultado.nivel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráfico Comparativo */}
        <div className="max-w-4xl mx-auto my-10 h-96">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">Comparativa por Área</h3>
          <Bar data={dataComparativo} options={options} plugins={[ChartDataLabels]} />
        </div>

        {/* Fortalezas y Oportunidades Clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Fortalezas</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {fortalezas.length > 0 ? fortalezas.map((f, idx) => <li key={idx}>{f}</li>) : <li>No se identificaron fortalezas claras</li>}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Oportunidades Clave</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {oportunidadesClave.length > 0 ? oportunidadesClave.map((o, idx) => <li key={idx}>{o}</li>) : <li>Sin oportunidades definidas</li>}
            </ul>
          </div>
        </div>

        {/* Acciones finales */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <button
            onClick={() => router.push('/madurez-digital')}
            className="bg-gray-300 hover:bg-gray-400 text-primary-dark px-6 py-3 rounded-full transition-all w-full md:w-auto"
          >
            Volver al Cuestionario
          </button>
          <PdfDownloadButton diagnostico={diagnostico} setGenerandoPDF={setGenerandoPDF} generandoPDF={generandoPDF} />
          <a
            href={`https://wa.me/593968213129?text=Hola%20TTS%20Digital   ,%20quisiera%20mejorar%20mi%20madurez%20digital`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all inline-flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <span>Agendar Consulta</span>
            <span className="inline-block bg-white text-green-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">💬</span>
          </a>
        </div>
      </div>
    </QuestionnaireLayout>
  );
}
const guardarDiagnosticoEnSheets = async (diagnostico) => {
  try {
    const res = await fetch('/api/guardar-diagnostico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diagnostico)
    });

    if (!res.ok) {
      console.error('Error al guardar en Google Sheets');
    } else {
      const data = await res.json();
      console.log('Datos guardados en Sheets:', data);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};