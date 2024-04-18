"use client";

import Link from "next/link";

import { TQueryValidator } from "../lib/validators/query-validator";
import { trpc } from "../trpc/client";
import { Product } from "../payload-types";
import ProductCard from "./ProductCard";

interface ProdcutReelProps {
  title: string;
  subtitle?: string;
  link?: string;
  query: TQueryValidator;
}

const DEFAULT_LIMIT = 4;

const ProductReel = (props: ProdcutReelProps) => {
  const { title, subtitle, link, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? DEFAULT_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.products);
  let productMap: (Product | null)[] = [];

  if (products && products.length) {
    productMap = products;
  } else if (isLoading) {
    productMap = new Array<null>(query.limit ?? DEFAULT_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {link ? (
          <Link
            href={link}
            className="hidden text---ssssssm font-medium text-orange-600 hover:text-orange-500 md:block"
          >
            View more <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {productMap.map((prod, idx) => (
              <ProductCard product={prod} index={idx} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
