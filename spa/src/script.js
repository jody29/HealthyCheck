import { detect } from './modules/detect.js'

const list = document.querySelector('#barcode-list')

let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video') // create a new video element
let display = document.querySelector('section:first-of-type')
let itemsFound = []

scanButton.addEventListener('click', () => {
   detect(itemsFound ,video, display, list)
   scanButton.classList.add('hidden')
})



