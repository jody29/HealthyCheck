import { renderData } from "./renderData.js" 

export const getData = (video, url, display) => {

    fetch(url)
        .then(result => {
            return result.status >= 200 && result.status <= 299 ? result.json() : console.log(result.status)
        })
        .then(result => {
            display.innerHTML = ''

            renderData(result)

            video.remove()
            video.autoplay = false
        })
        .catch(error => console.log(error))

}

