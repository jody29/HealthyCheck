import { detect } from './modules/detect.js'
import { checkBarcode } from './modules/checkBarcode.js'

const list = document.querySelector('#barcode-list')
const form = document.forms['checkBarcode']
const scanButton = document.querySelector('.scanButton')
const video = document.createElement('video') // create a new video element
const display = document.querySelector('section:first-of-type')

let itemsFound = []

scanButton.addEventListener('click', () => {
   detect(itemsFound ,video, display, list)
   scanButton.classList.add('hidden')
})

form.addEventListener('submit', (e) => {
   e.preventDefault()

   checkBarcode(itemsFound, video, display, form['barcode'].value, list)
})