/*
  Cloudflare Worker - Mercado Pago Checkout Pro

  SEGREDO OBRIGATÓRIO NO CLOUDFLARE:
  MP_ACCESS_TOKEN = Access Token de TESTE ou PRODUÇÃO.

  Nunca colocar MP_ACCESS_TOKEN no GitHub.
*/

const GIFTS = {
  roma_300: { title: 'Ajude a Roma a comprar um jogador melhor', price: 300 },
  moto_600: { title: 'Mais uma peça importada para a moto', price: 600 },
  tenis_400: { title: 'Mais um tênis que talvez nunca saia da caixa', price: 400 },
  jantar_350: { title: 'Um jantar que Riccardo não precisou cozinhar', price: 350 },
  encomenda_250: { title: 'Mais uma encomenda da Larissa', price: 250 },
  larissa_certa_150: { title: 'Fundo Larissa estava certa', price: 150 },
  riccardo_certo_170: { title: 'Fundo Riccardo também acha que estava certo', price: 170 },
  moto_essencial_320: { title: 'Próxima compra essencial para a moto', price: 320 },
  promocao_200: { title: 'Não precisava, mas estava em promoção', price: 200 },
  delivery_270: { title: 'Fundo emergência: ninguém quer cozinhar', price: 270 },
  sobremesa_180: { title: 'Sobremesa que juramos que vamos dividir', price: 180 },
  brinde_340: { title: 'Um brinde para ninguém admitir que estava errado', price: 340 },
  filme_220: { title: 'Escolher o que assistir em menos de 40 minutos', price: 220 },
  gps_450: { title: 'Passeio romântico sem discussão com o GPS', price: 450 },
  boletos_500: { title: 'Manter o romance depois dos boletos', price: 500 },
  merecemos_700: { title: 'Depois de organizar esse casamento, nós merecemos', price: 700 },
  lua_mel_1000: { title: 'Upgrade da lua de mel', price: 1000 },
  extravagancia_800: { title: 'Pequena extravagância que ainda vamos inventar', price: 800 }
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);
    if (!env.MP_ACCESS_TOKEN) return json({ error: 'Mercado Pago não configurado' }, 503, cors);

    try {
      const body = await request.json();
      const gift = GIFTS[body.giftId];
      if (!gift) return json({ error: 'Presente inválido' }, 400, cors);

      const siteUrl = env.SITE_URL || 'https://larissanaga-cmyk.github.io/convite-larissa-riccardo/';
      const preference = {
        items: [{ id: body.giftId, title: gift.title, quantity: 1, currency_id: 'BRL', unit_price: gift.price }],
        external_reference: body.giftId,
        back_urls: {
          success: siteUrl + '?payment=success#presentes',
          pending: siteUrl + '?payment=pending#presentes',
          failure: siteUrl + '?payment=failure#presentes'
        },
        auto_return: 'approved'
      };

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + env.MP_ACCESS_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify(preference)
      });

      const data = await response.json();
      if (!response.ok) return json({ error: 'Falha ao criar checkout', details: data }, 502, cors);
      return json({ id: data.id, init_point: data.init_point, sandbox_init_point: data.sandbox_init_point }, 200, cors);
    } catch (error) {
      return json({ error: String(error) }, 500, cors);
    }
  }
};

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders }
  });
}
