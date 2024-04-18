import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Media, Product } from "../payload-types";
import { PRODUCT_CATEGORIES } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "EUR" | "GBP" | "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(+price);
}

type ImageUrlsProps = { image: string | Media; id?: string | null | undefined };

export function getImageUrls(images: ImageUrlsProps[]) {
  const productImages = images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return productImages;
}

export function getProductLabel(product: Product) {
  const productImages = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  return productImages;
}
