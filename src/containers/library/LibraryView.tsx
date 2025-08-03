import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { ProductsList } from './ProductsList';
import { Navbar } from '@/containers/home';
import { Footer } from '@/components/common';

export const LibraryView = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <header className="border-b py-8">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-y-4 px-4 lg:px-12">
          <Link href="/" prefetch className="flex items-center gap-2">
            <ArrowLeftIcon className="size-4" />
            <span className="text font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">Your purchases and reviews</p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-(--breakpoint-xl) flex-1 px-4 py-4 lg:px-12">
        <ProductsList />
      </section>
      <Footer />
    </div>
  );
};
