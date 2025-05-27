import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, empresa, tipoEmpresa, fecha, promedioGeneral, nivelGeneral, resultadosPorArea } = req.body;

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets ']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // ID de tu hoja de Google Sheets
    const range = 'Hoja1!A:Z'; // Cambia esto si usas otra hoja/rango

    const values = [
      [
        nombre,
        empresa,
        tipoEmpresa,
        fecha,
        promedioGeneral,
        nivelGeneral,
        ...resultadosPorArea.map(r => `${r.area}: ${r.promedio} - ${r.nivel}`),
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    res.status(200).json({ message: 'Datos guardados correctamente.' });
  } catch (error) {
    console.error('Error al guardar en Google Sheets:', error.message);
    res.status(500).json({ error: 'No se pudieron guardar los datos.' });
  }
}