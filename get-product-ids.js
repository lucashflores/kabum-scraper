import axios from "axios";

export async function getProductIds(baseURL) {
    let response = await axios.get(getURL(baseURL, 1))
    const productCount = +response.data.matchAll(/<div id\="listingCount" class\="sc\-273aa53f\-11 jPndNW"><b>(.*?)<\/b>/g).next().value[1]
    const pageCount = Math.ceil(productCount / 100);
    let currentPage = 1
    const productIds = []
    while (currentPage <= pageCount) {
        const matches = response.data.matchAll(/class\="sc\-cdc9b13f\-10 jaPdUR productLink" data\-smarthintproductid\="(.*?)">/g)
        for (const match of matches) {
            productIds.push(match[1])
        }
        currentPage++
        response = await axios.get(getURL(baseURL, currentPage))
    }
    return productIds
}

function getURL(baseURL, pageNumber) {
    return `${baseURL}?page_number=${pageNumber}&page_size=100&facet_filters=&sort=most_searched`
}