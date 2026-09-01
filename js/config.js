/*
  Configuração pública do convite.
  IMPORTANTE:
  - Nunca colocar Access Token do Mercado Pago neste arquivo.
  - O Access Token ficará apenas no backend/Cloudflare Worker.
  - GOOGLE_SCRIPT_URL recebe a URL pública do Apps Script do RSVP.
*/
window.WEDDING_CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyFgRi30pMGKWrkqRyEkltDASbHIDSqDG1OLHtFHVZeZwfy_PwDBYuMfZNhm1jYvmR3/exec",
  PAYMENT_API_URL: "https://convite-mercadopago.larissa-naga.workers.dev/",
  PIX_KEY: "59395b0d-0a73-43ae-b554-a6fd81dc7c6d",
  MUSIC_SRC: "Mu%CC%81sica%20site.mp3",
  MAP_URL: "https://share.google/CtQGtm6MDaeGIzhuj"
};
