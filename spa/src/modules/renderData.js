export const renderData = (result, display) => {

    const product = {
        name: result.product.product_name, // assigning values to properties of this object
        brand: result.product.brand_owner ? result.product.brand_owner : '',
        img: result.product.image_front_url,
        nutriments: result.product.nutriments
    }

    // render the data
    const markup = `
        <img src=${product.img} alt='${product.name}'/>
        <h3>${product.name}</h3>
        <h4>Nutriments per 100g</h4>
        <ul class='nutriments'>
            <li>Caffeine: ${ product.nutriments['caffeine_100g'] ? product.nutriments['caffeine_100g'] : '0'}mg</li>
            <li>Carbohydrates: ${product.nutriments['carbohydrates_100g'] ? product.nutriments['carbohydrates_100g'] : '0'}g</li>
            <li>Calories: ${product.nutriments['energy-kcal_100g'] ? product.nutriments['energy-kcal_100g'] : '0'}kcal</li>
            <li>Fat: ${product.nutriments['fat_100g'] ? product.nutriments['fat_100g'] : '0'}g</li>
            <li>Fibers: ${product.nutriments['fiber_100g'] ? product.nutriments['fiber_100g'] : '0'}g</li>
            <li>Proteins: ${product.nutriments['proteins_100g'] ? product.nutriments['proteins_100g'] : '0'}g</li>
            <li>Salts: ${product.nutriments['salt_100g'] ? product.nutriments['salt_100g'] : '0'}g</li>
            <li>Sugars: ${product.nutriments['fat_100g'] ? product.nutriments['fat_100g'] : '0'}g</li>
        </ul>
        <a href='' class='newProduct'>Scan new product</a>   
    `

    display.insertAdjacentHTML('beforeend', markup) // first section in the main gets the information about the product

    document.querySelector('.newProduct').addEventListener('click', () => { window.history.back() })
}