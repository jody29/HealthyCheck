window.onload = () => {
   detect()
}

const detect = async () => {
   const barcodeDetector = new BarcodeDetector()
   const list = document.querySelector('#barcode-list')
   let itemsFound = []
   const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: "environment"}
   })

   const video = document.createElement('video')
   video.srcObject = mediaStream
   video.autoplay = true

   list.before(video)

   const render = () => {
      barcodeDetector
         .detect(video)
         .then((barcodes) => {
            barcodes.forEach((barcode) => {
               if (!itemsFound.includes(barcode.rawValue)) {
                  itemsFound.push(barcode.rawValue)
                  const li = document.createElement('li')
                  li.innerHTML = barcode.rawValue
                  const newBarcode = barcode.rawValue
                  list.appendChild(li)

                  const url = `https://world.openfoodfacts.org/api/v0/product/${newBarcode}.json`
                  
                  fetch(url)
                  .then(result => result.json())
                  .then(result => {
                     console.log(result.product)

                     const product = {
                        name: result.product.product_name,
                        brand: result.product.brand_owner ? result.product.brand_owner : '',
                        img: result.product.image_front_url,
                        nutriments: result.product.nutriments
                     }

                     let nutrimentList = product.nutriments

                     console.log(nutrimentList)

                     console.log(product)

                     const markup = `
                     <img src=${product.img} alt='${product.name}'/>
                     <h2>${product.name}</h2>
                     <ul class='nutrimentList'>
                        
                     </ul>
                     `

                     const nutriments = document.querySelector('.kcalList')

                     for (const [key, value] of Object.entries(nutrimentList)) {
                        let listItem = document.createElement('li')
                        listItem.innerHTML = `${key}: ${value}`

                        nutriments.appendChild(listItem)
                     }

                     document.querySelector('main section:first-of-type').innerHTML = markup
                  })
                  .catch(error => document.body.insertAdjacentHTML('beforebegin', error))
               }
            })
         })
         .catch(console.error)

   }

   (function renderLoop() {
      requestAnimationFrame(renderLoop)
      render()
   })()

}