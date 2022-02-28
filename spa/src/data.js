import { getData } from './modules/getData.js'

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
               if (!itemsFound.includes(barcode.rawValue)) {
                  itemsFound.push(barcode.rawValue)
                  const li = document.createElement('li')
                  li.innerHTML = barcode.rawValue
                  const newBarcode = barcode.rawValue
                  list.appendChild(li)

                  const url = `https://world.openfoodfacts.org/api/v0/product/${newBarcode}.json`
                  display.innerHTML = `
                  <section>
                     <svg width='140%' height='90vh' class='loadSkeleton' fill='rgb(150,150,150)'>
                        <rect width='100%' height='22em' />
                        <rect transform='translate(20, 375)' width='30%' height='2em' />
                        <rect transform='translate(20, 440)' width='30%' height='1.5em' />
                        <rect transform='translate(20, 470)' width='25%' height='1em' />
                        <rect transform='translate(20, 490)' width='25%' height='1em' />
                        <rect transform='translate(20, 510)' width='25%' height='1em' />
                        <rect transform='translate(20, 530)' width='25%' height='1em' />
                     </svg>
                  </section>
                  `
                  
                  getData(video, url, display)
                  
               }
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

