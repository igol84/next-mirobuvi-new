import {ProductType} from "@/components/Products/types";
import ProductCard from "@/components/Products/ProductCard";
import ShoesCard from "@/components/Products/ShoesCard";
import React from "react";

export const productCardFactory = (product: ProductType) => {
  switch (product.type) {
    case "product":
      return <ProductCard product={product}/>
    case "shoes":
      return <ShoesCard product={product}/>
    default:
      return <ProductCard product={product}/>
  }
}