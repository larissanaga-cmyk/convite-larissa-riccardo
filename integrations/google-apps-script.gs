/*
  Google Apps Script para receber o RSVP e gravar no Google Sheets.

  Planilha esperada (linha 1):
  Data/Hora | Nome | Presença | Quantidade | WhatsApp | Mensagem | Idioma

  COMO USAR (depois):
  1. Abra a planilha RSVP - Casamento Larissa e Riccardo.
  2. Extensões > Apps Script.
  3. Cole este código.
  4. Ajuste SHEET_NAME se necessário.
  5. Implantar > Nova implantação > App da Web.
  6. Executar como: você.
  7. Quem pode acessar: qualquer pessoa.
  8. Copie a URL /exec e coloque em js/config.js como GOOGLE_SCRIPT_URL.
*/

const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Aba não encontrada: ' + SHEET_NAME);
    }

    sheet.appendRow([
      new Date(),
      sanitize_(data.name),
      data.attendance === 'yes' ? 'Sim' : 'Não',
      Number(data.quantity || 1),
      sanitize_(data.whatsapp),
      sanitize_(data.message),
      data.language === 'it' ? 'Italiano' : 'Português'
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, service: 'RSVP Larissa & Riccardo' });
}

function sanitize_(value) {
  const text = String(value || '').trim();
  // Evita fórmulas acidentais/maliciosas no Sheets.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
