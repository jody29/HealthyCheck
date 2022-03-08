import { renderData } from "./renderData.js" 
import { errorProduct } from "../utils/error.js"

export const getData = (video, barcode, display) => {

    // API url
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`

    fetch(url)
        .then(result => {
            return result.status >= 200 && result.status <= 299 ? result.json() : Promise.reject(result)
        })
        .then(result => {
            display.innerHTML = '' // loading event is over

            renderData(result, display) // function to render the data

            video.remove() // when there is a result, remove the video element
            video.autoplay = false // stop playing the video
        })
        .catch(() => {
            display.innerHTML = errorProduct
            document.querySelector('.try').addEventListener('click', () => { window.history.back() })
        })

}

