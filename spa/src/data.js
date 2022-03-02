import { checkBarcode } from './modules/checkBarcode.js'

let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video') // create a new video element
let display = document.querySelector('section:first-of-type')

const detect = async () => {
   const barcodeDetector = new BarcodeDetector() // create a new barcode detector
   const list = document.querySelector('#barcode-list')
   let itemsFound = []
   const mediaStream = await navigator.mediaDevices.getUserMedia({ // prompts the user for permission to use the face camera
      video: {facingMode: "environment"}
   })
   
   video.srcObject = mediaStream // source of the video element is the front camera
   video.autoplay = true // video will play automaticly

   list.before(video)

   const render = () => {
      barcodeDetector // call the barcodeDetector
         .detect(video) // make it detect barcodes on the video element
         .then((barcodes) => {
            barcodes.forEach((barcode) => {
               checkBarcode(itemsFound, video, display, barcode, list) // function that checks the barcode
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

