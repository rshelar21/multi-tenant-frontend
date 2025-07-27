'use client';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSingleProductAPI } from '@/api/products';
import { Loader, RichTextEditer } from '@/components/common';
import { ReviewSidebar } from './ReviewSidebar';

export const LibraryDetails = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders', productId],
    queryFn: async () => await getSingleProductAPI(productId),
  });

  return (
    <div className="min-h-screen">
      <nav className="w-full border-b bg-[#F4F4F0] p-4 dark:bg-black">
        <Link href="/" prefetch className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </Link>
      </nav>

      <header className="border-b bg-[#F4F4F0] py-8 dark:bg-black">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-y-4 px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data?.name}</h1>
        </div>
      </header>
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-10 lg:px-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="dark:bg-input/30 gap-4 rounded-md border bg-white p-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>

          <div className="lg:col-span-5">
            {isLoading ? (
              <div className="">
                <Loader />
              </div>
            ) : (
              <RichTextEditer
                initialContent={data?.content}
                isEditable={false}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
