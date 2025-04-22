addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);

  // если запрос не к analytics.yisscraft.ru — отдадим его «как есть»
  if (url.hostname !== 'analytics.yisscraft.ru') {
    return fetch(request);
  }

  // а если он к analytics.yisscraft.ru — меняем порт/протокол и уходим к Plan
  url.hostname = 'analytics.yisscraft.ru';  // можно не менять, но пусть будет явно
  url.port     = '25781';
  url.protocol = 'http:';                   // или 'https:' — в зависимости от конфигурации Plan

  // сохраним остальные заголовки, включая Host
  const init = {
    method:   request.method,
    headers:  request.headers,
    body:     request.body,
    redirect: 'manual'
  };

  return fetch(url.toString(), init);
}
