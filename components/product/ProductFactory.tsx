import React from "react";
import SimpleProduct from "@/components/product/SimpleProduct";
import Shoes from "@/components/product/Shoes";
import {ProductType} from "@/components/product/types";

export const productFactory = (productData: ProductType) => {
  switch (productData.type) {
    case "product":
      return <SimpleProduct productData={productData}/>
    case "shoes":
      return <Shoes shoesData={productData}/>
    default:
      return <SimpleProduct productData={productData}/>
  }
}