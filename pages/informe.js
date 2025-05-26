// pages/informe.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionnaireLayout from '../components/QuestionnaireLayout';

export default function InformePage() {
  const router = useRouter();
  const [diagnostico, setDiagnostico] = useState(null);

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

  // Convertir fecha ISO a formato local legible
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-EC');

  // Función para obtener recomendación según nivel
  const getRecomendacionGlobal = (nivel) => {
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

const recomendacion = recomendacionGeneral || getRecomendacionGlobal(nivelGeneral);

return (
  <QuestionnaireLayout>
    {/* Encabezado Institucional */}
    <div className="flex flex-col items-center justify-center text-center py-8 bg-white">
      <img src="/logo-sf-1.png" alt="Logo TTS Digital" className="h-24 mb-6" />
      <h1 className="text-3xl font-bold text-primary-dark mb-4">Diagnóstico de Madurez Digital</h1>
      <p className="text-lg text-gray-600">Informe generado el {fechaFormateada}</p>
    </div>

    {/* Datos del Cliente */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-gray-50 rounded-lg shadow-md border border-blue-100 p-6 mb-8">
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
          Tu empresa está en el nivel <strong>{nivelGeneral}</strong> de madurez digital.
          <span className="ml-1 font-medium">{parseFloat(promedioGeneral).toFixed(2)} de 4.0 posible.</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Fortalezas</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {fortalezas.length > 0 ? fortalezas.map((f, idx) => (
                <li key={idx}>{f}</li>
              )) : <li>No se identificaron fortalezas claras</li>}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-500">Oportunidades Clave</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {oportunidadesClave.length > 0 ? oportunidadesClave.map((o, idx) => (
                <li key={idx}>{o}</li>
              )) : <li>Sin oportunidades definidas</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Recomendación General */}
      <div className="bg-blue-50 rounded-lg border-l-4 border-primary-dark p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary-dark mb-4">Recomendación General</h2>
        <p className="text-gray-700 leading-relaxed">
          {recomendacion}
        </p>
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

      {/* Espacio para Gráfico Comparativo (pendiente conectar mañana) */}
      <div className="max-w-4xl mx-auto my-10 h-96 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-center">
        <div>
          <p>Gráfico comparativo pendiente por conectar</p>
          <p className="text-sm mt-2">(Se activará mañana con react-chartjs-2)</p>
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
        <button
          onClick={() => alert("Funcionalidad de descarga en desarrollo...")}
          className="bg-gold text-primary-dark px-6 py-3 rounded-full hover:bg-yellow-400 transition-all w-full md:w-auto"
        >
          Descargar Informe
        </button>
        <a
          href={`https://wa.me/593968213129?text=Hola%20TTS%20Digital  ,%20quisiera%20mejorar%20mi%20madurez%20digital`}
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