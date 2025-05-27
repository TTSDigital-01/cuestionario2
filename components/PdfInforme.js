// components/PdfInforme.js - Versión 24
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
    padding: 72, // ≈ 2.5 cm lateral
    fontFamily: 'Helvetica',
    backgroundColor: '#fff'
  },
  pageConMargenSuperior: {
    padding: 72,
    paddingTop: 72, // ≈ 2.5 cm
    fontFamily: 'Helvetica',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  logo: {
    width: 90,
    height: 45
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E3A8A',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 14,
    marginBottom: 8
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666'
  },
  value: {
    fontSize: 12,
    color: '#4A4A4A',
    marginBottom: 6
  },
  section: {
    marginBottom: 12
  },

  // Tablas sin bordes
  tableNoBorderRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  tableNoBorderCell: {
    flex: 1,
    paddingRight: 10
  },
  tableNoBorderLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666'
  },
  tableNoBorderValue: {
    fontSize: 12,
    color: '#4A4A4A'
  },

  // Niveles de madurez
  nivelItem: {
    fontSize: 10,
    color: '#4A4A4A',
    marginLeft: 10,
    marginBottom: 6
  },
  nivelRed: { color: '#FF0000', fontWeight: 'bold' },
  nivelOrange: { color: '#ffb235', fontWeight: 'bold' },
  nivelYellow: { color: '#FFFF00', fontWeight: 'bold' },
  nivelGreen: { color: '#58d663', fontWeight: 'bold' },

  // Gráfico Comparativo
  graficoSection: {
    marginTop: 20,
    marginBottom: 20
  },
  graficoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
    textAlign: 'center'
  },
  graficoImage: {
    width: '100%',
    maxHeight: 300,
    marginHorizontal: 'auto'
  },

  // Resultados por Área – Tabla completa
  areaTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E3A8A',
    padding: 6
  },
  areaTableCellArea: {
    flex: 2,
    fontSize: 10,
    color: '#1E3A8A'
  },
  areaTableCellPuntaje: {
    flex: 1,
    fontSize: 10,
    color: '#1E3A8A',
    textAlign: 'center'
  },
  areaTableCellNivel: {
    flex: 1,
    fontSize: 10,
    color: '#1E3A8A',
    textAlign: 'center'
  },
  areaTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 6,
    backgroundColor: '#f9fafb'
  },

  // Fortalezas y oportunidades
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

  // Recomendación General
  recomendacionGeneral: {
    fontSize: 12,
    color: '#4A4A4A',
    marginBottom: 12
  },

  // Código QR
  qrCodeContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center'
  },
  qrCodeImage: {
    width: 80,
    height: 80,
    marginBottom: 8
  },
  qrCodeText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default function PdfDocument({ diagnostico, graficoDataURL }) {
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

  const getLevelStyle = (nivel) => {
    if (nivel.includes('Tradicional')) return styles.nivelRed;
    if (nivel.includes('Explorador')) return styles.nivelOrange;
    if (nivel.includes('Emergente')) return styles.nivelYellow;
    if (nivel.includes('Digitalizado')) return styles.nivelGreen;
    return {};
  };

  return (
    <Document>
      {/* Primera página */}
      <Page size="A4" style={styles.page}>
        {/* Encabezado Institucional – Solo Logo */}
        <View style={styles.header}>
          <Image src="/logo-sf-1.png" style={styles.logo} />
        </View>

        {/* Título centrado */}
        <View style={styles.section}>
          <Text style={styles.title}>Diagnóstico de Madurez Digital</Text>
          <Text style={{ fontSize: 10, color: '#666666', textAlign: 'center', marginBottom: 20 }}>
            Fecha: {fechaFormateada}
          </Text>
        </View>

        {/* Datos del Cliente */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Datos del Cliente</Text>
          <View style={styles.tableNoBorderRow}>
            <View style={styles.tableNoBorderCell}>
              <Text style={styles.tableNoBorderLabel}>Nombre:</Text>
              <Text style={styles.tableNoBorderValue}>{nombre}</Text>
            </View>
            <View style={styles.tableNoBorderCell}>
              <Text style={styles.tableNoBorderLabel}>Empresa:</Text>
              <Text style={styles.tableNoBorderValue}>{empresa}</Text>
            </View>
            <View style={styles.tableNoBorderCell}>
              <Text style={styles.tableNoBorderLabel}>Tamaño:</Text>
              <Text style={styles.tableNoBorderValue}>{tipoEmpresa}</Text>
            </View>
          </View>
        </View>

        {/* Diagnóstico General */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Diagnóstico General</Text>
          <View style={styles.tableNoBorderRow}>
            <View style={styles.tableNoBorderCell}>
              <Text style={styles.tableNoBorderLabel}>Puntaje Promedio:</Text>
              <Text style={styles.tableNoBorderValue}>{promedioGeneral.toFixed(2)} / 4.0</Text>
            </View>
            <View style={styles.tableNoBorderCell}>
              <Text style={styles.tableNoBorderLabel}>Nivel de Madurez:</Text>
              <Text style={getLevelStyle(nivelGeneral)}>{nivelGeneral}</Text>
            </View>
          </View>
        </View>

        {/* ¿Qué significan los niveles? */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>¿Qué significan los niveles?</Text>
          <Text style={styles.nivelItem}><Text style={styles.nivelRed}>🔴 Tradicional:</Text> Operación manual, sin visión ni estrategia digital definida.</Text>
          <Text style={styles.nivelItem}><Text style={styles.nivelOrange}>🟠 Explorador:</Text> Uso básico de herramientas, sin alineación estratégica clara.</Text>
          <Text style={styles.nivelItem}><Text style={styles.nivelYellow}>🟡 Emergente:</Text> Herramientas digitales activas y análisis parcial de resultados.</Text>
          <Text style={styles.nivelItem}><Text style={styles.nivelGreen}>🟢 Digitalizado:</Text> Sistemas conectados, decisiones basadas en datos y automatización avanzada.</Text>
        </View>

        {/* Gráfico Comparativo */}
        {graficoDataURL && (
          <View style={styles.graficoSection}>
            <Text style={styles.graficoTitle}>Comparativa por Área</Text>
            <Image src={graficoDataURL} style={styles.graficoImage} />
          </View>
        )}
      </Page>

      {/* Segunda página */}
      <Page size="A4" style={styles.pageConMargenSuperior}>
        {/* Fortalezas y Oportunidades Clave */}
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
          <Text style={styles.recomendacionGeneral}>{recomendacionGeneral}</Text>
        </View>

        {/* Resultados por Área – TABLA COMPLETA */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Resultados por Área</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <View style={styles.areaTableHeader}>
              <Text style={styles.areaTableCellArea}>Área</Text>
              <Text style={styles.areaTableCellPuntaje}>Puntaje</Text>
              <Text style={styles.areaTableCellNivel}>Nivel de Madurez</Text>
            </View>
            {resultadosPorArea.map((area, idx) => (
              <View key={idx} style={styles.areaTableRow}>
                <Text style={styles.areaTableCellArea}>{area.area}</Text>
                <Text style={styles.areaTableCellPuntaje}>{area.puntaje.toFixed(2)}</Text>
                <Text style={getLevelStyle(area.nivel)}>{area.nivel}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* Tercera página – solo QR Code */}
      <Page size="A4" style={styles.page}>
        <View style={styles.qrCodeContainer}>
          <Image src="/QR-WAPP.svg" style={styles.qrCodeImage} />
          <Text style={styles.qrCodeText}>TTS Digital</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 10, color: '#666666', textAlign: 'center', marginTop: 40 }}>
            © {new Date().getFullYear()} TTS Digital | Transformamos MiPyMEs con tecnología accesible
          </Text>
        </View>
      </Page>
    </Document>
  );
}