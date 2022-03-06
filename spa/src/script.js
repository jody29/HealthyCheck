import { detect } from './modules/detect.js'

let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video') // create a new video element
let display = document.querySelector('section:first-of-type')

scanButton.addEventListener('click', () => {
   detect(video, display)
   scanButton.classList.add('hidden')
})

