(() => {
  const config = window.WEDDING_CONFIG || {};
  const state = { lang: localStorage.getItem("weddingLang") || "pt", opened: false, page: 0, selectedGift: null };

  const story = {
    pt: [
      `Dizem que o destino adora traçar caminhos inesperados, mas no nosso caso ele se superou. Em 2016, o Riccardo se despediu de Roma, na Itália, e cruzou o oceano rumo ao Brasil. Sua primeira parada foi na histórica Tiradentes (MG), mas foi em 2018, ao aceitar uma proposta de trabalho em São José dos Campos (SP), que a engrenagem do destino realmente começou a girar.`,
      `Em abril de 2018, nossos caminhos se cruzaram da forma mais moderna e despretensiosa possível: através de um aplicativo de relacionamento. Nenhum de nós dois estava procurando um compromisso sério; estávamos em fases tranquilas, leves e sem expectativas. Mas o amor não pede licença. O que era para ser apenas um encontro casual logo se transformou em uma paixão avassaladora e na certeza de que havíamos encontrado nossa metade.`,
      `No início de 2019, tomamos a decisão mais bonita de nossas vidas: queríamos nos casar. E como o universo adora nos surpreender, poucos meses depois descobrimos que o nosso amor havia transbordado. Em dezembro de 2019, recebemos o maior e mais precioso presente de nossas vidas: a nossa pequena Marina.`,
      `Em janeiro de 2020, oficializamos nossa união no civil. Para nós, aquilo era o suficiente. Estávamos completos e felizes no nosso ninho. No entanto, guardávamos no fundo do coração um único sonho, uma única condição que, se um dia fosse possível, nos faria celebrar com uma festa: ver nossas famílias unidas.`,
      `Como a família do Riccardo vive inteira na Itália e a minha no Brasil, e devido a delicados problemas de saúde de ambas as partes ao longo dos anos, nossos pais nunca tiveram a oportunidade de se conhecer pessoalmente.`,
      `Hoje, exatamente 10 anos após a chegada do Riccardo ao Brasil, esse sonho finalmente vai se realizar! Estamos preparando uma celebração íntima no jardim para celebrar não apenas o nosso casamento, mas o milagre do encontro das nossas famílias, com a vinda histórica dos meus sogros ao Brasil (um segredo que nossa pequena Marina só vai descobrir no dia em que chegarem!).`,
      `Preparem os corações e os lenços, porque este dia não será apenas sobre nós dois, mas sobre a vitória do amor e da família além de qualquer fronteira.`
    ],
    it: [
      `Si dice che il destino ami tracciare strade inaspettate, ma nel nostro caso ha davvero superato sé stesso. Nel 2016 Riccardo salutò Roma, in Italia, e attraversò l'oceano verso il Brasile. La sua prima tappa fu la storica Tiradentes, nel Minas Gerais, ma fu nel 2018, accettando una proposta di lavoro a São José dos Campos, che gli ingranaggi del destino iniziarono davvero a muoversi.`,
      `Nell'aprile del 2018 le nostre strade si incrociarono nel modo più moderno e spontaneo possibile: tramite un'app di incontri. Nessuno dei due cercava una relazione seria; vivevamo entrambi un momento tranquillo, leggero e senza aspettative. Ma l'amore non chiede permesso. Quello che doveva essere soltanto un incontro casuale si trasformò presto in una passione travolgente e nella certezza di aver trovato la propria metà.`,
      `All'inizio del 2019 prendemmo la decisione più bella della nostra vita: volevamo sposarci. E, come l'universo ama sorprenderci, pochi mesi dopo scoprimmo che il nostro amore era diventato ancora più grande. Nel dicembre 2019 ricevemmo il dono più prezioso della nostra vita: la nostra piccola Marina.`,
      `Nel gennaio 2020 ufficializzammo la nostra unione civile. Per noi era già abbastanza. Eravamo completi e felici nel nostro nido. Eppure custodivamo nel cuore un unico sogno, l'unica condizione che, se un giorno fosse diventata possibile, ci avrebbe fatto desiderare una vera celebrazione: vedere finalmente unite le nostre famiglie.`,
      `Poiché tutta la famiglia di Riccardo vive in Italia e la mia in Brasile, e a causa di delicati problemi di salute affrontati da entrambe le famiglie nel corso degli anni, i nostri genitori non hanno mai avuto l'opportunità di conoscersi di persona.`,
      `Oggi, esattamente dieci anni dopo l'arrivo di Riccardo in Brasile, quel sogno sta finalmente per diventare realtà! Stiamo preparando una celebrazione intima in giardino per festeggiare non soltanto il nostro matrimonio, ma il miracolo dell'incontro delle nostre famiglie, con lo storico arrivo dei miei suoceri in Brasile — un segreto che la nostra piccola Marina scoprirà soltanto il giorno in cui arriveranno!`,
      `Preparate i cuori e i fazzoletti, perché questo giorno non parlerà soltanto di noi due, ma della vittoria dell'amore e della famiglia oltre ogni confine.`
    ]
  };

  const translations = {
    pt: {open:"Toque para abrir",chooseLanguage:"Escolha o idioma e toque no lacre",ourStoryKicker:"Nossa história",ourStoryTitle:"Dois países, uma só história",continueInvitation:"Ver o convite",storyMenu:"Nossa história",invitationMenu:"Convite",withParents:"Com a bênção de nossos pais",inviteLead:"Convidamos para celebrar conosco",dateLabel:"Data",ceremonyLabel:"Início da cerimônia",receptionLabel:"Recepção",rsvpTitle:"Confirme sua presença",name:"Nome completo",attendance:"Você estará presente?",quantity:"Quantidade",whatsapp:"WhatsApp",message:"Mensagem",yes:"Sim",no:"Não",sendRsvp:"Enviar confirmação",location:"Localização",giftList:"Lista de presentes",giftKicker:"Com carinho",giftTitle:"Lista de presentes",giftIntro:"Os presentes são simbólicos e serão convertidos em contribuição para nossos próximos capítulos.",checkoutDemo:"Integração em preparação. O pagamento real será feito em ambiente seguro do Mercado Pago, com PIX ou cartão.",card:"Cartão",continuePayment:"Continuar para pagamento",backInvitation:"Voltar ao convite",backStory:"História",rsvpSaved:"Presença registrada com carinho. Obrigado!",rsvpDemo:"Formulário pronto. A gravação no Google Sheets será ativada assim que configurarmos o Apps Script.",rsvpError:"Não foi possível enviar agora. Tente novamente em alguns instantes.",giftDemo:"O checkout do Mercado Pago será ativado quando o backend de teste estiver conectado."},
    it: {open:"Tocca per aprire",chooseLanguage:"Scegli la lingua e tocca il sigillo",ourStoryKicker:"La nostra storia",ourStoryTitle:"Due Paesi, una sola storia",continueInvitation:"Vedi l'invito",storyMenu:"La nostra storia",invitationMenu:"Invito",withParents:"Con la benedizione dei nostri genitori",inviteLead:"Vi invitiamo a celebrare con noi",dateLabel:"Data",ceremonyLabel:"Inizio della cerimonia",receptionLabel:"Ricevimento",rsvpTitle:"Conferma la tua presenza",name:"Nome e cognome",attendance:"Sarai presente?",quantity:"Numero di persone",whatsapp:"WhatsApp",message:"Messaggio",yes:"Sì",no:"No",sendRsvp:"Invia conferma",location:"Posizione",giftList:"Lista regali",giftKicker:"Con affetto",giftTitle:"Lista regali",giftIntro:"I regali sono simbolici e diventeranno un contributo ai nostri prossimi capitoli.",checkoutDemo:"Integrazione in preparazione. Il pagamento reale avverrà nell'ambiente sicuro di Mercado Pago, tramite PIX o carta.",card:"Carta",continuePayment:"Continua al pagamento",backInvitation:"Torna all'invito",backStory:"Storia",rsvpSaved:"Presenza registrata con affetto. Grazie!",rsvpDemo:"Il modulo è pronto. Il salvataggio su Google Sheets sarà attivato appena configureremo Apps Script.",rsvpError:"Non è stato possibile inviare ora. Riprova tra poco.",giftDemo:"Il checkout di Mercado Pago sarà attivato quando collegheremo il backend di test."}
  };

  const gifts = [
    {id:"jantar_250",icon:"🍝",title:{pt:"Jantar a dois",it:"Cena per due"},description:{pt:"Uma noite especial para celebrarmos essa nova fase.",it:"Una serata speciale per festeggiare questo nuovo capitolo."},price:250},
    {id:"passeio_400",icon:"✈️",title:{pt:"Passeio na lua de mel",it:"Esperienza in luna di miele"},description:{pt:"Uma contribuição para transformar um dia da viagem em uma lembrança inesquecível.",it:"Un contributo per trasformare un giorno del viaggio in un ricordo indimenticabile."},price:400},
    {id:"casa_500",icon:"🏡",title:{pt:"Um detalhe para nossa casa",it:"Un dettaglio per la nostra casa"},description:{pt:"Um carinho para deixarmos nosso cantinho ainda mais acolhedor.",it:"Un pensiero per rendere il nostro angolo ancora più accogliente."},price:500},
    {id:"brinde_150",icon:"🥂",title:{pt:"Um brinde especial",it:"Un brindisi speciale"},description:{pt:"Um brinde ao amor, à família e ao encontro das nossas histórias.",it:"Un brindisi all'amore, alla famiglia e all'incontro delle nostre storie."},price:150},
    {id:"cafe_100",icon:"☕",title:{pt:"Café da manhã especial",it:"Colazione speciale"},description:{pt:"Um pequeno mimo para um dos nossos dias de recém-casados.",it:"Una piccola coccola per uno dei nostri giorni da novelli sposi."},price:100},
    {id:"livre",icon:"♡",title:{pt:"Contribuição livre",it:"Contributo libero"},description:{pt:"Para quem preferir nos presentear com outro valor.",it:"Per chi preferisce scegliere liberamente il valore del regalo."},price:null}
  ];

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const t = key => translations[state.lang][key] || key;
  const escapeHTML = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");

  function setLanguage(lang){
    if(!translations[lang]) return;
    state.lang=lang; localStorage.setItem("weddingLang",lang); document.documentElement.lang=lang==="it"?"it-IT":"pt-BR";
    $$(".lang-button").forEach(btn=>btn.classList.toggle("is-active",btn.dataset.lang===lang));
    $$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.textContent=translations[lang][key];});
    renderStory(); renderGifts();
  }

  function renderStory(){ $("#story-copy").innerHTML=story[state.lang].map((p,i)=>`<p${i===5?' class="story-highlight"':''}>${escapeHTML(p)}</p>`).join(""); }

  function renderGifts(){
    $("#gift-grid").innerHTML=gifts.map(g=>{const price=g.price?new Intl.NumberFormat(state.lang==="it"?"it-IT":"pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(g.price):(state.lang==="it"?"Scegli tu":"Você escolhe");return `<article class="gift-card"><div class="gift-card__icon">${g.icon}</div><h3>${escapeHTML(g.title[state.lang])}</h3><p>${escapeHTML(g.description[state.lang])}</p><div class="gift-card__price">${price}</div><button class="primary-button gift-action" type="button" data-gift="${g.id}">${state.lang==="it"?"Regala":"Presentear"}</button></article>`;}).join("");
    $$(".gift-action").forEach(btn=>btn.addEventListener("click",()=>openGift(btn.dataset.gift)));
  }

  function goToPage(index){
    const next=Math.max(0,Math.min(2,Number(index))); state.page=next;
    $("#pages-track").style.transform=`translate3d(-${next*100}vw,0,0)`;
    $$(".page").forEach((page,i)=>page.classList.toggle("is-current",i===next));
    $$("#page-dots button").forEach((dot,i)=>dot.classList.toggle("is-active",i===next));
    const current=$$(".page")[next]; const scroller=current?.querySelector(".page-scroll"); if(scroller) scroller.scrollTo({top:0,behavior:"smooth"});
  }

  async function openEnvelope(){
    if(state.opened)return; state.opened=true;
    const overlay=$("#opening-overlay"),envelope=$("#envelope"); overlay.classList.add("is-opening"); envelope.classList.add("is-opening"); startMusic();
    await new Promise(r=>setTimeout(r,1100)); overlay.classList.add("is-gone"); $("#experience-tools").hidden=false; $("#page-dots").hidden=false; goToPage(0);
  }

  function startMusic(){const audio=$("#background-music");if(!config.MUSIC_SRC)return;if(!audio.src)audio.src=config.MUSIC_SRC;audio.play().then(()=>updateMusicButton(true)).catch(()=>updateMusicButton(false));}
  function updateMusicButton(playing){const b=$("#music-button");b.classList.toggle("is-playing",playing);b.setAttribute("aria-pressed",String(playing));}
  async function toggleMusic(){const audio=$("#background-music");if(!config.MUSIC_SRC){alert(state.lang==="it"?"La traccia musicale verrà aggiunta prima della pubblicazione finale.":"A trilha musical será adicionada antes da publicação final.");return;}if(audio.paused){try{await audio.play();updateMusicButton(true)}catch{updateMusicButton(false)}}else{audio.pause();updateMusicButton(false)}}

  async function submitRSVP(event){
    event.preventDefault();const form=event.currentTarget,status=$("#rsvp-status"),fd=new FormData(form);const payload={timestamp:new Date().toISOString(),name:String(fd.get("name")||"").trim(),attendance:fd.get("attendance"),quantity:Number(fd.get("quantity")||1),whatsapp:String(fd.get("whatsapp")||"").trim(),message:String(fd.get("message")||"").trim(),language:state.lang};
    if(!payload.name){status.textContent=state.lang==="it"?"Inserisci il tuo nome.":"Informe seu nome.";return;}status.textContent=state.lang==="it"?"Invio...":"Enviando...";
    if(!config.GOOGLE_SCRIPT_URL){await new Promise(r=>setTimeout(r,400));status.textContent=t("rsvpDemo");return;}
    try{const response=await fetch(config.GOOGLE_SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});if(!response.ok)throw new Error("RSVP request failed");status.textContent=t("rsvpSaved");form.reset();}catch(error){console.error(error);status.textContent=t("rsvpError");}
  }

  function openGift(id){const gift=gifts.find(g=>g.id===id);if(!gift)return;state.selectedGift=gift;const box=$("#gift-checkout");box.hidden=false;$("#checkout-title").textContent=gift.title[state.lang];$("#checkout-copy").textContent=t("checkoutDemo");box.scrollIntoView({behavior:"smooth",block:"center"});}
  async function startCheckout(){
    if(!state.selectedGift)return;
    if(!config.PAYMENT_API_URL){alert(t("giftDemo"));return;}
    try{
      const response=await fetch(config.PAYMENT_API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({giftId:state.selectedGift.id,lang:state.lang})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data?.details?.message || data?.error || "Checkout request failed");
      const checkoutUrl=data.sandbox_init_point || data.init_point;
      if(!checkoutUrl)throw new Error("Missing checkout URL");
      window.location.href=checkoutUrl;
    }catch(error){
      console.error(error);
      alert((state.lang==="it"?"Non è stato possibile aprire il pagamento: ":"Não foi possível abrir o pagamento: ") + (error?.message || "erro desconhecido"));
    }
  }

  function setupMenu(){const button=$("#menu-button"),panel=$("#menu-panel");button.addEventListener("click",()=>{const open=panel.classList.toggle("is-open");button.setAttribute("aria-expanded",String(open));});panel.addEventListener("click",()=>{panel.classList.remove("is-open");button.setAttribute("aria-expanded","false")});document.addEventListener("click",e=>{if(!panel.contains(e.target)&&!button.contains(e.target)){panel.classList.remove("is-open");button.setAttribute("aria-expanded","false")}});}

  function setupSwipe(){
    let startX=0,startY=0,active=false;
    const target=$("#paper-window")||document.querySelector(".paper-window");
    target.addEventListener("touchstart",e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;active=true},{passive:true});
    target.addEventListener("touchend",e=>{if(!active)return;active=false;const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.25)return;if(dx<0&&state.page<2)goToPage(state.page+1);if(dx>0&&state.page>0)goToPage(state.page-1)},{passive:true});
  }

  function init(){
    $$(".lang-button").forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang)));
    $("#open-envelope").addEventListener("click",openEnvelope); $("#music-button").addEventListener("click",toggleMusic); $("#rsvp-form").addEventListener("submit",submitRSVP); $("#checkout-close").addEventListener("click",()=>$("#gift-checkout").hidden=true); $("#checkout-action").addEventListener("click",startCheckout);
    $$('[data-next]').forEach(btn=>btn.addEventListener("click",()=>goToPage(btn.dataset.next))); $$('[data-page]').forEach(btn=>btn.addEventListener("click",()=>goToPage(btn.dataset.page)));
    if(config.MAP_URL)$("#location-link").href=config.MAP_URL; setupMenu(); setupSwipe(); setLanguage(state.lang); goToPage(0);
  }
  document.addEventListener("DOMContentLoaded",init);
})();