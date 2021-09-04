this.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const options = {
    body: "Notification app",
    icon: 'Group16.png',
  };

  event.waitUntil(this.registration.showNotification(event.data.text(), options));
});
