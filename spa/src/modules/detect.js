import { checkBarcode } from "./checkBarcode.js"

export const detect = async (itemsFound ,video, display, list) => {
   const barcodeDetector = new BarcodeDetector() // create a new barcode detector
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
            checkBarcode(itemsFound, video, display, barcodes[0], list) // function that checks the barcode
         })
         .catch(console.error)
   }

   (function renderLoop() {
      requestAnimationFrame(renderLoop)
       render()
    })()
   
 
}