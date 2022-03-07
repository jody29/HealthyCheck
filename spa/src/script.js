import { detect } from './modules/detect.js'
import { validateForm } from './modules/validateForm.js'

const list = document.querySelector('#barcode-list')
const form = document.forms['checkBarcode']

let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video') // create a new video element
let display = document.querySelector('section:first-of-type')
let itemsFound = []

scanButton.addEventListener('click', () => {
   detect(itemsFound ,video, display, list)
   scanButton.classList.add('hidden')
})

form.addEventListener('submit', (e) => {
   e.preventDefault()
   console.log('test')
   
   validateForm(itemsFound, video, display, form['barcode'].value, list)
})