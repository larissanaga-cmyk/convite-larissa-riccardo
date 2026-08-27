/*
  Cloudflare Worker - Mercado Pago Checkout Pro (estrutura inicial)

  SEGREDO OBRIGATÓRIO NO CLOUDFLARE:
  MP_ACCESS_TOKEN = Access Token de TESTE ou PRODUÇÃO.

  Nunca colocar MP_ACCESS_TOKEN no GitHub.
*/

const GIFTS = {
  jantar_250: { title: 'Jantar a dois', price: 250 },
  passeio_400: { title: 'Passeio na lua de mel', price: 400 },
  casa_500: { title: 'Um detalhe para nossa casa', price: 500 },
  brinde_150: { title: 'Um brinde especial', price: 150 },
  cafe_100: { title: 'Café da manhã especial', price: 100 }
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

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors);
    }

    if (!env.MP_ACCESS_TOKEN) {
      return json({ error: 'Mercado Pago não configurado' }, 503, cors);
    }

    try {
      const body = await request.json();
      const gift = GIFTS[body.giftId];

      if (!gift) {
        return json({ error: 'Presente inválido' }, 400, cors);
      }

      const siteUrl = env.SITE_URL || 'https://larissanaga-cmyk.github.io/convite-larissa-riccardo/';

      const preference = {
        items: [{
          id: body.giftId,
          title: gift.title,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: gift.price
        }],
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
        headers: {
          'Authorization': 'Bearer ' + env.MP_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preference)
      });

      const data = await response.json();
      if (!response.ok) {
        return json({ error: 'Falha ao criar checkout', details: data }, 502, cors);
      }

      return json({
        id: data.id,
        init_point: data.init_point,
        sandbox_init_point: data.sandbox_init_point
      }, 200, cors);
    } catch (error) {
      return json({ error: String(error) }, 500, cors);
    }
  }
};

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders
    }
  });
}
