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

  function setupInvitationInfo() {
    const notes = document.querySelector('.event-notes');
    if (!notes || document.querySelector('.dress-guide')) return;

    const paragraphs = notes.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].remove();

    const style = document.createElement('style');
    style.textContent = `
      .event-notes{max-width:650px;margin:24px auto 18px;text-align:center}
      .event-notes p:first-child{margin:0;padding:15px 18px;border:1px solid rgba(201,151,55,.38);border-radius:18px;background:rgba(255,250,241,.78);font-size:clamp(18px,4.7vw,23px);line-height:1.4;color:#57361f;box-shadow:0 7px 20px rgba(67,41,19,.06)}
      .event-notes p:first-child strong{color:#b97810;font-size:1.08em}
      .dress-guide{max-width:650px;margin:18px auto 28px;padding:30px 22px 26px;border:1px solid rgba(201,151,55,.55);border-radius:28px;background:linear-gradient(180deg,rgba(255,253,247,.96),rgba(255,248,236,.92));box-shadow:0 10px 30px rgba(67,41,19,.08);text-align:center;color:#57361f}
      .dress-guide__kicker{margin:0 0 8px;font:600 11px/1.2 "Quicksand",sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#b97810}
      .dress-guide__rule{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px auto 8px;color:#c99737}
      .dress-guide__rule::before,.dress-guide__rule::after{content:"";width:82px;height:1px;background:rgba(201,151,55,.48)}
      .dress-guide h3{margin:5px 0 12px;font:400 clamp(40px,10vw,60px)/1 "Cormorant Garamond",Georgia,serif;color:#57361f}
      .dress-guide__icon{width:118px;height:118px;margin:0 auto 17px;border:1px solid rgba(201,151,55,.30);border-radius:50%;display:grid;place-items:center;color:#b97810;background:rgba(255,250,241,.72)}
      .dress-guide__icon svg{width:72px;height:72px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
      .dress-guide__text{max-width:520px;margin:0 auto;font-size:clamp(20px,5vw,27px);line-height:1.42}
      .dress-guide__footer{display:flex;align-items:center;justify-content:center;gap:10px;margin:20px auto 0;color:#c99737}
      .dress-guide__footer::before,.dress-guide__footer::after{content:"❧";font-size:26px;opacity:.65}
      html[lang="pt-BR"] .dress-guide .it-only,html[lang="it-IT"] .dress-guide .pt-only{display:none!important}
      @media(max-width:520px){.dress-guide{padding:25px 17px 22px;border-radius:23px}.dress-guide__icon{width:102px;height:102px}.dress-guide__icon svg{width:62px;height:62px}.event-notes{margin-top:18px}}
    `;
    document.head.appendChild(style);

    const guide = document.createElement('section');
    guide.className = 'dress-guide';
    guide.setAttribute('aria-label', 'Informações sobre o traje');
    guide.innerHTML = `
      <p class="dress-guide__kicker"><span class="pt-only">Informações</span><span class="it-only">Informazioni</span></p>
      <div class="dress-guide__rule">♥</div>
      <h3><span class="pt-only">Traje</span><span class="it-only">Abbigliamento</span></h3>
      <div class="dress-guide__icon" aria-hidden="true">
        <svg viewBox="0 0 80 80"><path d="M24 19c0-5 4-8 8-8s8 3 8 8c0 4-3 6-7 8l-4 2"/><path d="M29 29l-12 8 7 28h18l5-28-12-8"/><path d="M46 31l8-5 9 5 9-5 4 10-6 4v27H51V40l-8-4z"/><path d="M57 27l6 7 6-7"/><path d="M63 35v31"/></svg>
      </div>
      <p class="dress-guide__text pt-only">Venha bonito, confortável e do seu jeito.<br>Se quiser uma dica para as fotos,<br>esporte fino funciona super bem.<br><strong>Só não vale roupa rasgada 😂</strong></p>
      <p class="dress-guide__text it-only">Vieni elegante, comodo e a modo tuo.<br>Se vuoi un consiglio per le foto,<br>un look elegante informale funziona benissimo.<br><strong>Solo niente vestiti strappati 😂</strong></p>
      <div class="dress-guide__footer">♥</div>
    `;
    notes.insertAdjacentElement('afterend', guide);
  }

  setupInvitationInfo();

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
        if (status) status.textContent = italian ? "Il collegamento con il modulo non è configurato." : "A conexão com o formulário ainda não está configurada.";
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
        if (status) status.textContent = italian ? "Conferma inviata. Grazie!" : "Confirmação enviada. Obrigado!";
        form.reset();
      } catch (error) {
        console.error("Erro ao enviar RSVP:", error);
        if (status) status.textContent = italian ? "Non è stato possibile inviare ora. Riprova tra poco." : "Não foi possível enviar agora. Tente novamente em alguns instantes.";
      }
    }, true);
  }

  window.addEventListener("load", () => {
    setupInvitationInfo();

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "css/gifts-extended.css?v=11";
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = "js/gifts-extended.js?v=11";
    document.body.appendChild(script);
  });
})();