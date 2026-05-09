import { Link } from 'react-router';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

type HomeHeroProps = {
  categories: any[];
  loadingCategories: boolean;
};

export function HomeHero({ categories, loadingCategories }: HomeHeroProps) {
  return (
    <section className='relative overflow-hidden rounded-3xl border bg-linear-to-br from-background via-background to-primary/10 shadow-sm'>
      {/* Glow */}
      <div
        className='absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl'
        aria-hidden
      />

      <div className='relative grid gap-10 p-8 md:grid-cols-2 md:items-center md:p-12 lg:p-14'>
        {/* Content */}
        <div>
          <h1 className='max-w-xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
            Hardware & workspace,
            <span className='block text-primary'>ready to ship</span>
          </h1>

          <p className='mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg'>
            Audio, wearables, workspace, and travel—curated for work and home.
            Secure checkout; after payment, use your order page for support chat
            and video.
          </p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Link to='/catalog'>
              <Button size='lg' className='gap-2 shadow-sm'>
                Shop catalog
                <ArrowRightIcon className='h-4 w-4' />
              </Button>
            </Link>

            <Link to='/cart'>
              <Button size='lg' variant='outline'>
                View cart
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className='grid gap-4'>
          <div className='rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur'>
            <p className='text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground'>
              Categories
            </p>

            <div className='mt-3 text-4xl font-bold text-primary'>
              {loadingCategories ? (
                <Skeleton className='h-10 w-16 rounded-md' />
              ) : (
                categories.length
              )}
            </div>

            <p className='mt-2 text-sm text-muted-foreground'>Curated groups</p>
          </div>

          <div className='rounded-2xl border border-primary/20 bg-primary/5 p-5'>
            <div className='flex items-start gap-3'>
              <div className='rounded-full bg-primary/10 p-2 text-primary'>
                <SparklesIcon className='h-4 w-4' />
              </div>

              <div>
                <p className='font-medium text-foreground'>Secure checkout</p>

                <p className='mt-1 text-sm text-muted-foreground'>
                  Priority support on paid orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
