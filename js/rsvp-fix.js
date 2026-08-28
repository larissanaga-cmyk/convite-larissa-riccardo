(() => {
  function isItalian() {
    return document.documentElement.lang === "it-IT";
  }

  async function submitRSVP(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const form = event.currentTarget;
    const status = document.querySelector("#rsvp-status");
    const config = window.WEDDING_CONFIG || {};
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      attendance: String(fd.get("attendance") || "no"),
      whatsapp: String(fd.get("whatsapp") || "").trim(),
      message: String(fd.get("message") || "").trim()
    };

    if (!payload.name) {
      if (status) status.textContent = isItalian() ? "Inserisci il tuo nome." : "Informe seu nome.";
      return;
    }

    if (!config.GOOGLE_SCRIPT_URL) {
      if (status) status.textContent = isItalian()
        ? "Il collegamento con il modulo non è configurato."
        : "A conexão com o formulário ainda não está configurada.";
      return;
    }

    if (status) status.textContent = isItalian() ? "Invio..." : "Enviando...";

    try {
      /*
        O Apps Script redireciona a resposta para googleusercontent.com.
        Em GitHub Pages isso pode fazer o navegador bloquear a leitura da
        resposta por CORS mesmo quando a gravação foi executada. Com no-cors
        a requisição continua sendo enviada sem exigir acesso à resposta.
      */
      await fetch(config.GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      if (status) status.textContent = isItalian()
        ? "Conferma inviata. Grazie!"
        : "Confirmação enviada. Obrigado!";
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar RSVP:", error);
      if (status) status.textContent = isItalian()
        ? "Non è stato possibile inviare ora. Riprova tra poco."
        : "Não foi possível enviar agora. Tente novamente em alguns instantes.";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#rsvp-form");
    if (form) form.addEventListener("submit", submitRSVP, true);
  });
})();
