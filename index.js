addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  url.hostname = 'analytics.yisscraft.ru' // IP твоего сервера
  url.port = '25781' // порт панели Plan

  return fetch(url, request)
}
