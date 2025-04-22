
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  const url = new URL(request.url)
  // подменяем хост и порт на тот, где реально работает Plan
  url.hostname = 'analytics.yisscraft.ru'      // ваш IP
  url.port     = '25781'              // порт web‑панели

  // хост‑заголовок должен остаться panel.yisscraft.ru
  const headers = new Headers(request.headers)
  headers.set('Host', 'panel.yisscraft.ru')

  return fetch(url.toString(), {
    method:  request.method,
    headers: headers,
    body:    request.body
  })
}
