import axios from "axios";
import { writeFile, open } from "fs";

export async function getProductInfo(productId) {
    const response = await axios.get("https://www.kabum.com.br/produto/"+productId)
    const productTitle = response.data.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/g).next().value[1]
    const imageURL = response.data.match(new RegExp(`https://images.kabum.com.br/produtos/fotos/${productId}\*"`))
    const oldPriceIfAvailable = parsePriceToNumber(response.data.matchAll(/oldPrice">(.*?)<\/span>/g).next().value[1])
    const finalPrice = parsePriceToNumber(response.data.matchAll(/finalPrice">(.*?)<\/h4>/g).next().value[1])
    const regularPrice = parsePriceToNumber(response.data.matchAll(/regularPrice">(.*?)<\/b>/g).next().value[1])
    const rating = response.data.matchAll(/gAjNhT">(.*?)<\/span>/g)
    writeFile("./htmlzin.txt", response.data, err => {
        console.log(err)
    })
    console.log(imageURL)
}

function parsePriceToNumber(price) {
    return +price.replace("R$", "").replace(",", ".")
}