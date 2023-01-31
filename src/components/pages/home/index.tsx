import { trpc } from '@src/utils/trpc';
import React from 'react'
import emptyProductImage from "public/empty-product-image.png";
import Image from 'next/image';



export const Home = () => {
   const { isLoading, isError, refetch, data } = trpc.products.getProducts.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      // 60 seconds stale time
      staleTime: 60 * 24,
      
    }
  ); 

  if (isLoading) return <div>Loading...</div>
  
  if (isError) return <div>Something went wrong</div>

  const productList = data?.products

  return (
   <div className="bg-white z-0">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList.map((product) => (
              <a key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                 
                  <Image alt={product.description} src={product.image ?? emptyProductImage} fill className='h-full w-full object-cover object-center group-hover:opacity-75' />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
  )
}