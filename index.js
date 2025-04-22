addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  url.port     = '25781';
  url.protocol = 'https:';
  // убираем любые переопределения Host — пусть будет analytics.yisscraft.ru
  return fetch(url.toString(), {
    method:   request.method,
    headers:  request.headers,
    body:     request.body,
    redirect: 'manual'
  });
}
