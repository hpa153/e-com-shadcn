import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

import PageWrapper from "@/components/PageWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import AdvertiserCard from "@/components/AdvertiserCard";

const pros = [
  {
    name: "Instant Delivery",
    icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "Environment Friendly",
    icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Home() {
  return (
    <>
      <PageWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for the best&nbsp;
            <span className="text-orange-500">Digital Assets</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Hippo-Com! Your verified platform for the greatest assets
            with smallest prices!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promises &rarr;</Button>
          </div>
        </div>
      </PageWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <PageWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {pros.map((pro) => (
              <AdvertiserCard item={pro} key={pro.name} />
            ))}
          </div>
        </PageWrapper>
      </section>
    </>
  );
}
