export const getData = (video, url, display) => {

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
                    <li>Salts: ${product.nutriments['salt_100g']}g</li>
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

