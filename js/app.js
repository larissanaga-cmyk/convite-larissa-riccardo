(() => {
  const config = window.WEDDING_CONFIG || {};
  const state = { lang: localStorage.getItem("weddingLang") || "pt", opened: false, page: 0, selectedGift: null };

  const story = {
    pt: [
      `Dizem que algumas histórias começam por acaso. A de Larissa e Riccardo começou com um oceano no meio, duas famílias em países diferentes e nenhum dos dois fazendo grandes planos para o amor. Em 2016, Riccardo deixou Roma e veio para o Brasil. Sua primeira parada foi Tiradentes, em Minas Gerais. Dois anos depois, uma oportunidade de trabalho o levou até São José dos Campos, em São Paulo. Na época, ele não sabia, mas aquela mudança acabaria sendo bem mais importante do que qualquer proposta profissional.`,
      `Em abril de 2018, Larissa e Riccardo se conheceram por meio de um aplicativo de relacionamento. Nenhum dos dois estava procurando um compromisso sério. A ideia era simples: conversar, sair, conhecer alguém interessante e não complicar muito a vida. Naturalmente, foi exatamente aí que tudo começou a se complicar da melhor maneira possível.`,
      `Um encontro virou dois, dois viraram muitos, as conversas ficaram cada vez mais longas e, sem grande cerimônia, a companhia virou parceria. Quando perceberam, já estavam construindo planos juntos — justamente aquilo que nenhum dos dois tinha ido procurar.`,
      `No início de 2019, decidiram que queriam se casar. Poucos meses depois, a vida resolveu antecipar um dos capítulos mais importantes dessa história: Marina estava a caminho. Em dezembro daquele ano, ela chegou e transformou tudo. A partir dali, Larissa e Riccardo já não eram apenas um casal. Eram uma família.`,
      `Em janeiro de 2020, oficializaram a união no civil. Para eles, naquele momento, aquilo bastava. Tinham construído seu lar, estavam juntos e felizes, e uma grande celebração não parecia necessária. Mas havia um desejo que continuava guardado: reunir as duas famílias no mesmo lugar.`,
      `A família de Riccardo vive na Itália. A família de Larissa, no Brasil. Ao longo dos anos, a distância e delicadas questões de saúde fizeram com que os pais dos dois nunca tivessem a oportunidade de se conhecer pessoalmente. Foi assim que nasceu a única condição capaz de justificar uma verdadeira festa: finalmente tornar esse encontro possível.`,
      `Agora, exatamente dez anos depois da chegada de Riccardo ao Brasil, esse sonho vai se realizar. Mais do que celebrar um casamento, este dia marcará o encontro de duas famílias, duas culturas e dois países que, durante tantos anos, fizeram parte da mesma história à distância. E ainda haverá uma surpresa especial: Marina não sabe que os avós da Itália virão ao Brasil. Ela só descobrirá quando eles chegarem.`,
      `Depois de tantos caminhos, quilômetros, mudanças de planos e algumas boas surpresas do destino, duas famílias que nunca haviam se encontrado estarão, finalmente, no mesmo jardim. Dois países, duas famílias e uma só história.`
    ],
    it: [
      `Si dice che alcune storie inizino per caso. Quella di Larissa e Riccardo è iniziata con un oceano in mezzo, due famiglie in Paesi diversi e nessuno dei due impegnato a fare grandi progetti per l'amore. Nel 2016 Riccardo ha lasciato Roma ed è venuto in Brasile. La sua prima tappa è stata Tiradentes, nel Minas Gerais. Due anni dopo, un'opportunità di lavoro lo ha portato a São José dos Campos, nello Stato di San Paolo. All'epoca non poteva saperlo, ma quel trasferimento sarebbe diventato molto più importante di qualsiasi proposta professionale.`,
      `Nell'aprile del 2018 Larissa e Riccardo si sono conosciuti tramite un'app di incontri. Nessuno dei due cercava una relazione seria. L'idea era semplice: parlare, uscire, conoscere qualcuno di interessante e non complicarsi troppo la vita. Naturalmente, è stato proprio allora che tutto ha cominciato a complicarsi nel modo migliore possibile.`,
      `Un appuntamento è diventato due, due sono diventati molti, le conversazioni si sono fatte sempre più lunghe e, quasi senza accorgersene, la compagnia è diventata complicità. Quando se ne sono resi conto, stavano già facendo progetti insieme — esattamente ciò che nessuno dei due aveva intenzione di cercare all'inizio.`,
      `All'inizio del 2019 hanno deciso di sposarsi. Pochi mesi dopo, la vita ha anticipato uno dei capitoli più importanti di questa storia: Marina era in arrivo. Nel dicembre dello stesso anno è nata e ha cambiato tutto. Da quel momento Larissa e Riccardo non erano più soltanto una coppia. Erano una famiglia.`,
      `Nel gennaio del 2020 hanno ufficializzato la loro unione con il matrimonio civile. Per loro, in quel momento, bastava così. Avevano costruito la loro casa, erano insieme e felici, e una grande celebrazione non sembrava necessaria. Ma restava un desiderio custodito nel tempo: riunire le due famiglie nello stesso luogo.`,
      `La famiglia di Riccardo vive in Italia. Quella di Larissa, in Brasile. Nel corso degli anni, la distanza e delicati problemi di salute hanno fatto sì che i loro genitori non avessero mai l'opportunità di conoscersi di persona. È nata così l'unica condizione capace di giustificare una vera festa: rendere finalmente possibile quell'incontro.`,
      `Ora, esattamente dieci anni dopo l'arrivo di Riccardo in Brasile, quel sogno sta per diventare realtà. Più che celebrare un matrimonio, questo giorno segnerà l'incontro di due famiglie, due culture e due Paesi che, per tanti anni, hanno fatto parte della stessa storia a distanza. E ci sarà anche una sorpresa speciale: Marina non sa che i nonni dall'Italia verranno in Brasile. Lo scoprirà soltanto quando arriveranno.`,
      `Dopo tanti percorsi, chilometri, cambi di programma e qualche bella sorpresa del destino, due famiglie che non si erano mai incontrate saranno finalmente nello stesso giardino. Due Paesi, due famiglie e una sola storia.`
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