export default function swDev() {
  const determineAppServerKey: () => any = () => {
    const vapidPublicKey = 'BBNZelUhZi647nFqW17lCiV3O-wj6ZZbMP2OIoHxvWJyzuXQvo8mVyXcAtRP_UnXbKXed4mmMUnQoaXjtJI5kNI'
    return urlBase64ToUint8Array(vapidPublicKey)
  }

  const urlBase64ToUint8Array:(base64String: string) => any = (base64String) => {
    const padding: string = '='.repeat((4-base64String.length % 4) % 4);
    const base64: string = (base64String + padding)
      .replace(/\-/g,'+')
      .replace(/_/g,'/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`

  navigator.serviceWorker.register(swUrl).then((res: any) => {
    console.warn('response',res)
    return res.pushManager.getSubscription()
      .then((subs: any) => {
        return res.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey()
        })
      })
  })

}
