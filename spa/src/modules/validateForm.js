import { checkBarcode } from "./checkBarcode.js"

export const validateForm = (itemsFound, video, display, barcode, list) => {
    console.log(typeof barcode)

    checkBarcode(itemsFound, video, display, barcode, list)
}