/*
  Google Apps Script para receber o RSVP e gravar no Google Sheets.

  Planilha esperada (linha 1):
  Data/Hora | Nome | Presença | WhatsApp | Mensagem

  COMO USAR:
  1. Abra a planilha RSVP - Casamento Larissa e Riccardo.
  2. Crie/renomeie a aba para RSVP.
  3. Na linha 1 use: Data/Hora | Nome | Presença | WhatsApp | Mensagem
  4. Extensões > Apps Script.
  5. Cole este código.
  6. Implantar > Nova implantação > App da Web.
  7. Executar como: você.
  8. Quem pode acessar: qualquer pessoa.
  9. Copie a URL /exec e coloque em js/config.js como GOOGLE_SCRIPT_URL.
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
      sanitize_(data.whatsapp),
      sanitize_(data.message)
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
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
