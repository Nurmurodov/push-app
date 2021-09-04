addEventListener('load',async () => {
  let sw = await navigator.serviceWorker.register('./sw.js')
  console.log(sw)
})

const subscribe = async () => {
  let sw = await navigator.serviceWorker.ready
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BGqBMNdmCc7oLOX3_DD74yaqi736IsihvzninSYXLi1k2xIwHksMF_SvcYrTE_xXAP9SfnhdiLLfbXWLLdwY4XU'
  })
  console.log(JSON.stringify(push))
}

export default subscribe