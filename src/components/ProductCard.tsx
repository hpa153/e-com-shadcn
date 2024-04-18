"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Product } from "../payload-types";
import ProductPlaceHolder from "./ProductPlaceHolder";
import { cn, formatPrice, getImageUrls, getProductLabel } from "../lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import ImageSlider from "./ImageSlider";

interface ProductCardProps {
  product: Product | null;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceHolder />;
  }

  const productLabel = getProductLabel(product);

  const validImgUrls = getImageUrls(product.images);

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={validImgUrls} />

          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{productLabel}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ProductCard;
