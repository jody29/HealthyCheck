import { renderData } from "./renderData.js" 
import { errorProduct } from "../utils/error.js"

export const getData = (video, url, display) => {

    fetch(url)
        .then(result => {
            console.log(result.status)
            return result.status >= 200 && result.status <= 299 ? result.json() : console.log('not found') // check if there is not a error state in the result
        })
        .then(result => {
            display.innerHTML = '' // loading event is over

            renderData(result) // function to render the data

            video.remove() // when there is a result, remove the video element
            video.autoplay = false // stop playing the video
        })
        .catch(() => {
            display.innerHTML = errorProduct
            document.querySelector('.try').addEventListener('click', () => { window.history.back() })
        })

}

