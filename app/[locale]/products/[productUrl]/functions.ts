import Cookies from "js-cookie";

export const saveViewedProducts = (url: string) => {
  const viewedProductsJSON = Cookies.get('viewedProducts')
  const viewedProducts: string[] = viewedProductsJSON ? JSON.parse(viewedProductsJSON) : []
  const setProductsUrl = new Set(viewedProducts)
  setProductsUrl.delete(url)
  setProductsUrl.add(url)
  let newViewedProducts = Array.from(setProductsUrl)
  if (newViewedProducts.length > 3)
    newViewedProducts = newViewedProducts.slice(-3)
  const newViewedProductsJSON = JSON.stringify(newViewedProducts)
  Cookies.set('viewedProducts', newViewedProductsJSON)
}