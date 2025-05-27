// components/PdfInforme.js versión 17
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 90,
    height: 45,
    objectFit: 'contain'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E3A8A',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 16,
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666'
  },
  value: {
    fontSize: 12,
    color: '#4A4A4A',
    marginBottom: 8
  },
  section: {
    marginBottom: 16
  },

  // Tablas sin bordes
  tableNoBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  tableRowNoBorder: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tableCellNoBorder: {
    flex: 1,
    paddingRight: 10
  },
  tableCellLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666'
  },
  tableCellValue: {
    fontSize: 12,
    color: '#4A4A4A'
  },

  // Tabla de resultados por área
  areaTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E3A8A',
    padding: 6
  },
  areaTableCellBold: {
    flex: 1,
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  areaTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 6,
    backgroundColor: '#f9fafb'
  },
  areaTableCell: {
    flex: 1,
    fontSize: 10,
    color: '#1E3A8A'
  },

  // Niveles de madurez
  levelRed: { color: '#FF0000', fontWeight: 'bold' },
  levelOrange: { color: '#ffb235', fontWeight: 'bold' },
  levelYellow: { color: '#FFFF00', fontWeight: 'bold' },
  levelGreen: { color: '#58d663', fontWeight: 'bold' },

  // Gráfico Comparativo
  graficoSection: {
    marginTop: 20,
    marginBottom: 20
  },
  graficoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8
  },

  // Fortalezas y Oportunidades
  fortalezaOportunidadRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  fortalezaOportunidadCell: {
    flex: 1,
    paddingRight: 10
  },
  fortalezaOportunidadTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8
  },
  listItem: {
    fontSize: 10,
    color: '#4A4A4A',
    marginLeft: 10,
    marginBottom: 6
  },

  // Pie de página
  footer: {
    marginTop: 40,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default function PdfDocument({ diagnostico, graficoDataURL }) {
  const { nombre, empresa, tipoEmpresa, fecha, promedioGeneral, nivelGeneral, recomendacionGeneral, resultadosPorArea, fortalezas, oportunidadesClave } = diagnostico;
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-EC');

  const getLevelStyle = (nivel) => {
    if (nivel.includes('Tradicional')) return styles.levelRed;
    if (nivel.includes('Explorador')) return styles.levelOrange;
    if (nivel.includes('Emergente')) return styles.levelYellow;
    if (nivel.includes('Digitalizado')) return styles.levelGreen;
    return {};
  };

  return (
    <Document>
      {/* Primera página */}
      <Page size="A4" style={styles.page}>
        {/* Encabezado Institucional */}
        <View style={styles.header}>
          <Image src="/logo-sf-1.png" style={styles.logo} />
        </View>

        <Text style={styles.title}>Diagnóstico de Madurez Digital</Text>
        <Text style={{ fontSize: 10, color: '#666666', textAlign: 'center', marginBottom: 20 }}>
          Fecha: {fechaFormateada}
        </Text>

        {/* Datos del Cliente - Tabla 3x2 sin bordes */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Datos del Cliente</Text>
          <View style={styles.tableRowNoBorder}>
            <View style={styles.tableCellNoBorder}>
              <Text style={styles.tableCellLabel}>Nombre:</Text>
              <Text style={styles.tableCellValue}>{nombre}</Text>
            </View>
            <View style={styles.tableCellNoBorder}>
              <Text style={styles.tableCellLabel}>Empresa:</Text>
              <Text style={styles.tableCellValue}>{empresa}</Text>
            </View>
            <View style={styles.tableCellNoBorder}>
              <Text style={styles.tableCellLabel}>Tamaño:</Text>
              <Text style={styles.tableCellValue}>{tipoEmpresa}</Text>
            </View>
          </View>
        </View>

        {/* Diagnóstico General - Tabla 2x2 sin bordes */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Diagnóstico General</Text>
          <View style={styles.tableRowNoBorder}>
            <View style={styles.tableCellNoBorder}>
              <Text style={styles.tableCellLabel}>Puntaje Promedio:</Text>
              <Text style={styles.tableCellValue}>{promedioGeneral.toFixed(2)} / 4.0</Text>
            </View>
            <View style={styles.tableCellNoBorder}>
              <Text style={styles.tableCellLabel}>Nivel de Madurez:</Text>
              <Text style={getLevelStyle(nivelGeneral)}>{nivelGeneral}</Text>
            </View>
          </View>
        </View>

        {/* Explicación de Niveles */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>¿Qué significan los niveles?</Text>
          <Text style={styles.listItem}><Text style={styles.levelRed}>🔴 Tradicional:</Text> Operación manual, sin visión ni estrategia digital definida.</Text>
          <Text style={styles.listItem}><Text style={styles.levelOrange}>🟠 Explorador:</Text> Uso básico de herramientas, sin alineación estratégica clara.</Text>
          <Text style={styles.listItem}><Text style={styles.levelYellow}>🟡 Emergente:</Text> Herramientas digitales activas y análisis parcial de resultados.</Text>
          <Text style={styles.listItem}><Text style={styles.levelGreen}>🟢 Digitalizado:</Text> Sistemas conectados, decisiones basadas en datos y automatización avanzada.</Text>
        </View>

        {/* Resultados por Área - Tabla completa en página 1 */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Resultados por Área</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <View style={styles.areaTableHeader}>
              <Text style={styles.areaTableCellBold}>Área</Text>
              <Text style={styles.areaTableCellBold}>Puntaje</Text>
              <Text style={styles.areaTableCellBold}>Nivel</Text>
            </View>
            {resultadosPorArea.map((area, idx) => (
              <View key={idx} style={styles.areaTableRow}>
                <Text style={styles.areaTableCell}>{area.area}</Text>
                <Text style={styles.areaTableCell}>{area.puntaje.toFixed(2)}</Text>
                <Text style={getLevelStyle(area.nivel)}>{area.nivel}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fortalezas y Oportunidades - Tabla 2x2 sin bordes */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Fortalezas y Oportunidades Clave</Text>
          <View style={styles.fortalezaOportunidadRow}>
            <View style={styles.fortalezaOportunidadCell}>
              <Text style={styles.fortalezaOportunidadTitle}>Fortalezas</Text>
              {fortalezas.length > 0 ? (
                fortalezas.map((f, idx) => (
                  <Text key={idx} style={styles.listItem}>• {f}</Text>
                ))
              ) : (
                <Text style={styles.listItem}>No se identificaron fortalezas claras.</Text>
              )}
            </View>
            <View style={styles.fortalezaOportunidadCell}>
              <Text style={styles.fortalezaOportunidadTitle}>Oportunidades</Text>
              {oportunidadesClave.map((o, idx) => (
                <Text key={idx} style={styles.listItem}>• {o}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Recomendación General */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Recomendación General</Text>
          <Text style={styles.value}>{recomendacionGeneral}</Text>
        </View>

        {/* Footer - Elaborado por TTS Digital */}
        <View style={styles.footer}>
          <Text style={{ fontSize: 10, color: '#666666' }}>
            Elaborado por TTS Digital | Transformamos MiPyMEs con tecnología accesible
          </Text>
        </View>
      </Page>

      {/* Segunda página – Gráfico Comparativo */}
      <Page size="A4" style={styles.page}>
        <View style={styles.graficoSection}>
          <Text style={styles.graficoTitle}>Comparativa por Área</Text>
          {graficoDataURL && (
            <Image src={graficoDataURL} style={{ width: '100%', maxHeight: 300 }} />
          )}
        </View>
      </Page>
    </Document>
  );
}