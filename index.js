
import { getProductIds } from "./get-product-ids.js";
import { getProductInfo } from "./get-product-info.js";

console.log("start")
const airCoolerUrls = await getProductIds("https://www.kabum.com.br/hardware/coolers/water-cooler");
await getProductInfo(airCoolerUrls[0])
// console.log(airCoolerUrls)