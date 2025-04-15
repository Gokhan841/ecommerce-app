import React from 'react';
import Card from './Card';
import { FetchProductList } from '../api';
import { useInfiniteQuery } from '@tanstack/react-query';

const Products = () => {
  const { 
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: FetchProductList,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === 12 ? allPages.length + 1 : undefined;
    },
  });

  // Loading ve Error durumları
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Ürünler listesi */}
      <div className='grid grid-cols-4 gap-8 p-12'>
        {data && data.pages ? (
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((item) => (
                  <Card key={item.id} item={item} />  // item.id'nin benzersiz olduğundan emin ol
              ))}
            </React.Fragment>
          ))
        ) : (
          <p>No products available</p>  // Eğer data veya pages gelmediyse bir mesaj göster
        )}
      </div>

      {/* Show More butonu */}
      <div>
        <button
          onClick={() => fetchNextPage()}  // Bir sonraki sayfayı yüklemek için
          disabled={!hasNextPage || isFetchingNextPage}  // Sayfa bitmediyse ve yükleniyorsa buton devre dışı
          className="px-6 py-2 bg-soft-teal text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Show More' : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}

export default Products;

// sayfalamaya iyi bak
