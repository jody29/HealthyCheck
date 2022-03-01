import { checkBarcode } from './modules/checkBarcode.js'

let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video')
let display = document.querySelector('section:first-of-type')

const detect = async () => {
   const barcodeDetector = new BarcodeDetector()
   const list = document.querySelector('#barcode-list')
   let itemsFound = []
   const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: "environment"}
   })
   
   video.srcObject = mediaStream
   video.autoplay = true

   list.before(video)

   const render = () => {
      barcodeDetector
         .detect(video)
         .then((barcodes) => {
            barcodes.forEach((barcode) => {
               checkBarcode(itemsFound, video, display, barcode, list)
            })
         })
         .catch(console.error)

   }

   (function renderLoop() {
      requestAnimationFrame(renderLoop)
      render()
   })()

}

scanButton.addEventListener('click', () => {
   detect()
   scanButton.classList.add('hidden')
})

