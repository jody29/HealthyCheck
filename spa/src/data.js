let scanButton = document.querySelector('.scanButton')
let video = document.createElement('video')
let display = document.querySelector('section:first-of-type')

const detect = async () => {
   const barcodeDetector = new BarcodeDetector()
   const list = document.querySelector('#barcode-list')
   let itemsFound = []
   const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: "environment"}
   })

   
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
                  display.innerHTML = `
                  <section>
                     <svg width='135%' height='90vh'>
                     <rect width='100%' height='22em' fill='rgb(200,200,200)' />
                     <rect y='30em width='20%' height='2em'/>
                     </svg>
                  </section>
                  `
                  
                  fetch(url)
                  .then(result => result.json())
                  .then(result => {
                     console.log(result.product)

                     display.innerHTML = ''

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
                     <h3>${product.name}</h3>
                     <h4>Nutriments per 100g</h4>
                     <ul class='nutriments'>
                        <li>Caffeine: ${product.nutriments['caffeine_100g']}mg</li>
                        <li>Carbohydrates: ${product.nutriments['carbohydrates_100g']}g</li>
                        <li>Calories: ${product.nutriments['energy-kcal_100g']}kcal</li>
                        <li>Fat: ${product.nutriments['fat_100g']}g</li>
                        <li>Fibers: ${product.nutriments['fiber_100g']}g</li>
                        <li>Proteins: ${product.nutriments['proteins_100g']}g</li>
                        <li>Satls: ${product.nutriments['salt_100g']}g</li>
                        <li>Sugars: ${product.nutriments['fat_100g']}g</li>

                     </ul>   
                     
                     `

                     for (const [key, value] of Object.entries(nutrimentList)) {
                        console.log(`${key}: ${value}`)
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

scanButton.addEventListener('click', () => {
   detect()
   scanButton.classList.add('hidden')
})

