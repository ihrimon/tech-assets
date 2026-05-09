import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { HomeHero } from '../components/HomeHero';
import { PageError } from '../components/PageError';
import { TrustStrip } from '../components/TrustStrip';
import { useHomeCatalog } from '../hooks/useHomeCatalog';

function HomePage() {
  const {
    products,
    categories,
    categoryChipsLoading,
    categoryFilter,
    error,
    loadingCategories,
    loadingList,
    setCategory,
  } = useHomeCatalog();

  return (
    <div className='space-y-12'>
      <HomeHero categories={categories} loadingCategories={loadingCategories} />

      <TrustStrip />

      {/* Catalog */}
      <section id='catalog' className='scroll-mt-24'>
        <div className='mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='font-mono text-3xl font-bold uppercase tracking-wide text-foreground'>
              Catalog
            </h2>

            <p className='mt-2 text-sm text-muted-foreground'>
              Explore curated tools, devices, and workspace gear.
            </p>
          </div>

          {/* Category Filter */}
          <div className='flex flex-wrap gap-2'>
            <Button
              size='sm'
              variant={!categoryFilter ? 'default' : 'outline'}
              onClick={() => setCategory('')}
            >
              All
            </Button>

            {categoryChipsLoading
              ? [1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className='h-9 w-20 rounded-lg' />
                ))
              : categories.map((c: string) => (
                  <Button
                    key={c}
                    size='sm'
                    variant={categoryFilter === c ? 'default' : 'outline'}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Button>
                ))}
          </div>
        </div>

        {/* Loading */}
        {loadingList ? (
          <ul className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i}>
                <Skeleton className='h-100 w-full rounded-3xl' />
              </li>
            ))}
          </ul>
        ) : error ? (
          <PageError message="We couldn't load products. Please try again in a moment." />
        ) : products.length === 0 ? (
          <div className='rounded-3xl border py-20 text-center'>
            <p className='text-muted-foreground'>
              No products in this category yet.
            </p>
          </div>
        ) : (
          <ul className='grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((p: any) => (
              <li key={p.id}>
                <CatalogProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default HomePage;
