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
                     <svg width='140%' height='90vh' class='loadSkeleton'>
                        <defs>
                           <linearGradient id='gradient' x1='50%' y1='0%' x2='50%' y2='100%'>
                              <stop offset='0%' stop-color='rgb(200,200,200)'>
                                 <animate attributeName='stop-color' values='rgb(150,150,150); rgb(100, 100, 100); rgb(200, 200, 200)'
                                 dur='4s' repeatCount='indefinite'
                                 ></animate>
                              </stop>
                              <stop offset='100%' stop-color='rgb(100,100,100')>
                                 <animate attributeName='stop-color' values='rgb(240, 240, 240); rgb(170,170,170); rgb(130,130,130)'
                                 dur='4s' repeatCount='indefinite'
                                 ></animate>
                              </stop>
                           </linearGradient>
                        </defs>
                        <g fill='url('#gradient')'>
                           <rect width='100%' height='22em' />
                           <rect transform='translate(20, 375)' width='30%' height='2em' />
                           <rect transform='translate(20, 440)' width='30%' height='1.5em' />
                           <rect transform='translate(20, 470)' width='25%' height='1em' />
                           <rect transform='translate(20, 490)' width='25%' height='1em' />
                           <rect transform='translate(20, 510)' width='25%' height='1em' />
                           <rect transform='translate(20, 530)' width='25%' height='1em' />
                        </g>
                     </svg>
                  </section>
                  `
                  
                  fetch(url)
                  .then(result => {
                     return result.status >= 200 && result.status <= 299 ? result.json() : console.log('error')
                  })
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
                     video.remove()
                     video.autoplay = false
                  })
                  .catch(error => console.log(error))
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

