import { getData } from "./getData.js"
import { loadingScreen } from "../utils/loader.js"

export const checkBarcode = (itemsFound, video, display, barcode, list, value) => {
    if (!itemsFound.includes(barcode.rawValue || barcode)) { // Check if the itemsFound array does not allready include the barcode value
        itemsFound.push(barcode.rawValue || barcode) // if not the case, then add the barcode value to the array
        const li = document.createElement('li') // create a list item
        li.innerHTML = barcode.rawValue || barcode // barcode value will be assigned to the list item
        const newBarcode = barcode.rawValue || barcode // create variable for the barcode value
        list.appendChild(li) // list item will be added to the list

        console.log(newBarcode)

        // API url
        const url = `https://world.openfoodfacts.org/api/v0/product/${newBarcode}.json`

        console.log(url)

        // Loading screen
        display.innerHTML = loadingScreen

        // Get data from the API
        getData(video, url, display) 
        
     }
}