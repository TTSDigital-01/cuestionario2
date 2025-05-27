// components/PdfDownloadButton.js versión 12
import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfInforme';

export default function InformePdf({ diagnostico }) {
  const [graficoDataURL, setGraficoDataURL] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Solo captura el gráfico cuando el diagnóstico está completo
  useEffect(() => {
    if (!diagnostico) return;

    const graficoDiv = document.getElementById('grafico-comparativo');
    if (!graficoDiv) {
      setCargando(false);
      return;
    }

    setTimeout(() => {
      html2canvas(graficoDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        setGraficoDataURL(image);
        setCargando(false);
      });
    }, 1000); // Aseguramos que el gráfico se haya renderizado
  }, [diagnostico]);

  if (!diagnostico || cargando) {
    return (
      <div className="mt-8">
        <p className="text-gray-600">Preparando informe...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <PDFDownloadLink document={<PdfDocument diagnostico={diagnostico} graficoDataURL={graficoDataURL} />} fileName="Diagnostico_Madurez_Digital.pdf">
        {({ blob, url, loading }) =>
          loading ? 'Generando PDF...' : 'Descargar Informe'
        }
      </PDFDownloadLink>
    </div>
  );
}