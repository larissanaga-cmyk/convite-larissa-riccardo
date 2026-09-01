(() => {
  const gifts = [
    {id:'roma_300', image:'01-roma-jogador.jpg', price:300, pt:'Ajude a Larissa a não surtar quando a Roma perde — contribua para comprarem um jogador melhor', it:'Aiuta Larissa a non impazzire quando la Roma perde — contribuisci per comprare un giocatore migliore'},
    {id:'moto_600', image:'02-pecas-moto.jpg', price:600, pt:'Ajude o Riccardo a comprar mais uma peça importada para a moto — porque aparentemente ainda falta alguma', it:'Aiuta Riccardo a comprare un altro pezzo importato per la moto — perché a quanto pare ne manca ancora qualcuno'},
    {id:'tenis_400', image:'03-tenis.jpg', price:400, pt:'Ajude o Riccardo a comprar mais um tênis que provavelmente nunca vai sair da caixa', it:'Aiuta Riccardo a comprare un altro paio di sneakers che probabilmente non usciranno mai dalla scatola'},
    {id:'jantar_350', image:'04-jantar.jpg', price:350, pt:'Um jantar que o Riccardo não precisou cozinhar', it:'Una cena che Riccardo non ha dovuto cucinare'},
    {id:'encomenda_250', image:'05-encomendas.jpg', price:250, pt:'Ajude o Riccardo a sobreviver quando chegar mais uma encomenda da Larissa', it:'Aiuta Riccardo a sopravvivere quando arriverà un altro pacco di Larissa'},
    {id:'larissa_certa_150', image:'06-larissa-certa.jpg', price:150, pt:'Fundo “Larissa estava certa” — para evitar discussões desnecessárias', it:'Fondo “Larissa aveva ragione” — per evitare discussioni inutili'},
    {id:'riccardo_certo_170', image:'07-riccardo-certo.jpg', price:170, pt:'Fundo “Riccardo também acha que estava certo” — pela democracia do casamento', it:'Fondo “Anche Riccardo pensa di avere ragione” — per la democrazia matrimoniale'},
    {id:'moto_essencial_320', image:'08-capacete-moto.jpg', price:320, pt:'Ajude a Larissa a sobreviver à próxima compra “essencial” para a moto', it:'Aiuta Larissa a sopravvivere al prossimo acquisto “indispensabile” per la moto'},
    {id:'promocao_200', image:'09-promocao.jpg', price:200, pt:'Fundo “não precisava, mas estava em promoção”', it:'Fondo “non serviva, ma era in offerta”'},
    {id:'delivery_270', image:'10-pizza-delivery.jpg', price:270, pt:'Fundo emergência: ninguém quer cozinhar hoje', it:'Fondo emergenza: oggi nessuno vuole cucinare'},
    {id:'sobremesa_180', image:'11-sobremesa.jpg', price:180, pt:'Patrocine uma sobremesa que os dois juram que vão dividir', it:'Offri un dolce che entrambi giurano di dividere'},
    {id:'brinde_340', image:'12-brinde-vinho.jpg', price:340, pt:'Um brinde para quando nenhum dos dois quiser admitir que estava errado', it:'Un brindisi per quando nessuno dei due vorrà ammettere di aver sbagliato'},
    {id:'filme_220', image:'13-netflix-filme.jpg', price:220, pt:'Ajude o casal a escolher o que assistir em menos de 40 minutos', it:'Aiuta la coppia a scegliere cosa guardare in meno di 40 minuti'},
    {id:'gps_450', image:'14-gps-passeio.jpg', price:450, pt:'Patrocine um passeio romântico sem discussão com o GPS', it:'Offri una gita romantica senza litigare con il GPS'},
    {id:'boletos_500', image:'15-boletos.jpg', price:500, pt:'Ajude a manter o romance depois que chegarem os boletos', it:'Aiuta a mantenere vivo il romanticismo quando arriveranno le bollette'},
    {id:'merecemos_700', image:'16-nos-merecemos.jpg', price:700, pt:'Fundo “depois de organizar esse casamento, nós merecemos”', it:'Fondo “dopo aver organizzato questo matrimonio, ce lo meritiamo”'},
    {id:'lua_mel_1000', image:'17-lua-de-mel.jpg', price:1000, pt:'Upgrade da lua de mel — porque sofrimento já basta organizar casamento', it:'Upgrade della luna di miele — perché organizzare il matrimonio è già abbastanza impegnativo'},
    {id:'extravagancia_800', image:'18-extravagancia.jpg', price:800, pt:'Patrocine uma pequena extravagância que ainda vamos inventar', it:'Offri una piccola stravaganza che dobbiamo ancora inventare'},
    {id:'livre_pix', image:'19-contribuicao-livre-pix.jpg', price:null, pix:true, pt:'Contribuição livre — você decide quanto vale participar dessa loucura 😂', it:'Contributo libero — decidi tu quanto vale partecipare a questa follia 😂'}
  ];

  const config = window.WEDDING_CONFIG || {};
  let selected = null;
  const lang = () => document.documentElement.lang?.toLowerCase().startsWith('it') ? 'it' : 'pt';
  const money = v => new Intl.NumberFormat(lang()==='it'?'it-IT':'pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(v);
  const escapeHTML = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');

  function render(){
    const grid = document.querySelector('#gift-grid'); if(!grid) return;
    const l = lang();
    grid.innerHTML = gifts.map(g=>`<article class="gift-card gift-card--illustrated${g.pix?' gift-card--pix':''}"><img class="gift-card__image" src="${g.image}?v=1" alt="" loading="lazy"><div class="gift-card__body"><h3>${escapeHTML(g[l])}</h3><div class="gift-card__price">${g.pix?(l==='it'?'Valore libero via PIX':'Valor livre via PIX'):money(g.price)}</div><button class="primary-button gift-action-extended" type="button" data-gift="${g.id}">${l==='it'?'Regala':'Presentear'}</button></div></article>`).join('');
    grid.querySelectorAll('.gift-action-extended').forEach(btn=>btn.addEventListener('click',()=>openGift(btn.dataset.gift)));
  }

  function resetAction(handler, label){
    const old=document.querySelector('#checkout-action'); if(!old) return null;
    const fresh=old.cloneNode(true); old.replaceWith(fresh); fresh.textContent=label; fresh.disabled=false; fresh.addEventListener('click',handler); return fresh;
  }

  function openGift(id){
    selected=gifts.find(g=>g.id===id); if(!selected) return;
    const l=lang(), box=document.querySelector('#gift-checkout'); box.hidden=false;
    document.querySelector('#checkout-title').textContent=selected[l]; const methods=document.querySelector('.payment-methods');
    if(selected.pix){
      document.querySelector('#checkout-copy').innerHTML=l==='it'?'Questa opzione è esclusiva per contributi via PIX. Scegli liberamente il valore e usa la chiave qui sotto.<div class="pix-key" id="pix-key"></div>':'Esta opção é exclusiva para contribuição via PIX. Escolha o valor que desejar e utilize a chave abaixo.<div class="pix-key" id="pix-key"></div>';
      if(methods) methods.innerHTML='<span>PIX</span>';
      const key=config.PIX_KEY||'', keyBox=document.querySelector('#pix-key'); keyBox.textContent=key||(l==='it'?'Chiave PIX da aggiungere prima della pubblicazione.':'Chave PIX será adicionada antes da publicação final.');
      const button=resetAction(async()=>{if(!key)return;await navigator.clipboard.writeText(key);button.textContent=l==='it'?'Chiave copiata!':'Chave copiada!';},l==='it'?'Copia chiave PIX':'Copiar chave PIX');
      if(button&&!key) button.disabled=true;
    }else{
      document.querySelector('#checkout-copy').textContent=l==='it'?'Pagamento sicuro tramite Mercado Pago.':'Pagamento seguro pelo Mercado Pago.';
      if(methods) methods.innerHTML=`<span>PIX</span><span>${l==='it'?'Carta':'Cartão'}</span>`;
      resetAction(startPayment,l==='it'?'Continua al pagamento':'Continuar para pagamento');
    }
    box.scrollIntoView({behavior:'smooth',block:'center'});
  }

  async function startPayment(){
    if(!selected||selected.pix)return;
    if(!config.PAYMENT_API_URL){alert(lang()==='it'?'Pagamento non configurato.':'Pagamento não configurado.');return;}
    try{
      const response=await fetch(config.PAYMENT_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({giftId:selected.id,lang:lang()})});
      const data=await response.json().catch(()=>({})); if(!response.ok)throw new Error(data?.details?.message||data?.error||'Checkout request failed');
      const url=data.init_point; if(!url)throw new Error('Missing production checkout URL'); window.location.href=url;
    }catch(error){alert((lang()==='it'?'Non è stato possibile aprire il pagamento: ':'Não foi possível abrir o pagamento: ')+(error?.message||'erro desconhecido'));}
  }

  function init(){render();document.querySelectorAll('.lang-button').forEach(btn=>btn.addEventListener('click',()=>setTimeout(render,0)));}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();