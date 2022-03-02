import { getData } from "./getData.js"

export const checkBarcode = (itemsFound, video, display, barcode, list) => {
    if (!itemsFound.includes(barcode.rawValue)) { // Check if the itemsFound array does not allready include the barcode value
        itemsFound.push(barcode.rawValue) // if not the case, then add the barcode value to the array
        const li = document.createElement('li') // create a list item
        li.innerHTML = barcode.rawValue // barcode value will be assigned to the list item
        const newBarcode = barcode.rawValue // create variable for the barcode value
        list.appendChild(li) // list item will be added to the list

        // API url
        const url = `https://world.openfoodfacts.org/api/v0/product/${newBarcode}.json`

        // Loading screen
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

        // Get data from the API
        getData(video, url, display) 
        
     }
}