import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

import { Media, Product } from "../payload-types";
import { PRODUCT_CATEGORIES } from "../config";

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

export function constructMetadata({
  title = "HippoCom - the marketplace for digital assets",
  description = "HippoCom is an open-source marketplace for high-quality digital goods.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@panh",
    },
    icons,
    metadataBase: new URL("hpa-e-com.up.railway.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
