(() => {
  const assets = [
    { src: "3.png", className: "has-opening-art" },
    { src: "nostro timbre.png", className: "has-monogram-art" }
  ];

  assets.forEach(({ src, className }) => {
    const image = new Image();
    image.onload = () => document.body.classList.add(className);
    image.src = src;
  });

  /*
    RSVP: intercepta o envio antes do handler antigo do app.js.
    O Google Apps Script redireciona a resposta para googleusercontent.com;
    em GitHub Pages alguns navegadores bloqueiam a leitura dessa resposta
    por CORS. Usamos no-cors para permitir o envio dos dados à planilha.
  */
  const form = document.querySelector("#rsvp-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const status = document.querySelector("#rsvp-status");
      const config = window.WEDDING_CONFIG || {};
      const fd = new FormData(form);
      const italian = document.documentElement.lang === "it-IT";

      const payload = {
        name: String(fd.get("name") || "").trim(),
        attendance: String(fd.get("attendance") || "no"),
        whatsapp: String(fd.get("whatsapp") || "").trim(),
        message: String(fd.get("message") || "").trim()
      };

      if (!payload.name) {
        if (status) status.textContent = italian ? "Inserisci il tuo nome." : "Informe seu nome.";
        return;
      }

      if (!config.GOOGLE_SCRIPT_URL) {
        if (status) status.textContent = italian
          ? "Il collegamento con il modulo non è configurato."
          : "A conexão com o formulário ainda não está configurada.";
        return;
      }

      if (status) status.textContent = italian ? "Invio..." : "Enviando...";

      try {
        await fetch(config.GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });

        if (status) status.textContent = italian
          ? "Conferma inviata. Grazie!"
          : "Confirmação enviada. Obrigado!";
        form.reset();
      } catch (error) {
        console.error("Erro ao enviar RSVP:", error);
        if (status) status.textContent = italian
          ? "Non è stato possibile inviare ora. Riprova tra poco."
          : "Não foi possível enviar agora. Tente novamente em alguns instantes.";
      }
    }, true);
  }

  function installGiftIllustrations() {
    const sprite = new Image();
    sprite.decoding = "async";
    sprite.onload = () => {
      const cellW = sprite.naturalWidth / 6;
      const cellH = sprite.naturalHeight / 4;
      const crops = [];

      for (let i = 0; i < 19; i += 1) {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(cellW);
        canvas.height = Math.round(cellH);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          sprite,
          col * cellW,
          row * cellH,
          cellW,
          cellH,
          0,
          0,
          canvas.width,
          canvas.height
        );
        crops.push(canvas.toDataURL("image/jpeg", 0.92));
      }

      const apply = () => {
        document.querySelectorAll("#gift-grid .gift-card__image").forEach((img, index) => {
          if (crops[index] && img.src !== crops[index]) img.src = crops[index];
        });
      };

      apply();
      const grid = document.getElementById("gift-grid");
      if (grid) {
        const observer = new MutationObserver(() => requestAnimationFrame(apply));
        observer.observe(grid, { childList: true, subtree: true });
      }
    };
    sprite.src = "assets/gifts-sprite.jpg?v=3";
  }

  window.addEventListener("load", () => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "css/gifts-extended.css?v=5";
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = "js/gifts-extended.js?v=5";
    script.onload = installGiftIllustrations;
    document.body.appendChild(script);
  });
})();