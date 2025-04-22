addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  // разбираем URL запроса
  const url = new URL(request.url);

  // оставляем тот же домен, но ставим нужный порт
  url.port = '25781';
  // явно указываем, что на этом порту — HTTPS
  url.protocol = 'https:';

  // сохраняем все остальные заголовки, в том числе Host: analytics.yisscraft.ru
  const init = {
    method:  request.method,
    headers: request.headers,
    body:    request.body,
    redirect: 'manual'
  };

  // делаем прозрачно прокси‑fetch на ваш Plan‑панельный порт
  return fetch(url.toString(), init);
}

