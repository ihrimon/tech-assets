import { ArrowRightIcon, PackageIcon, ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function EmptyCart() {
  return (
    <Card className='mx-auto max-w-lg border-dashed bg-gradient-to-b from-muted/40 to-background shadow-sm'>
      <CardContent className='px-6 py-12 text-center sm:px-10 sm:py-16'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-primary ring-4 ring-muted/70'>
          <ShoppingCartIcon className='h-10 w-10' aria-hidden />
        </div>

        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          Your cart is empty
        </h2>

        <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
          When you add products from the catalog, they&apos;ll show up here.
          Ready when you are.
        </p>

        <div className='mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center'>
          <Button className='gap-2 shadow-md'>
            <Link to='/catalog' className='flex items-center gap-1'>
              Browse catalog
              <ArrowRightIcon className='h-4 w-4' aria-hidden />
            </Link>
          </Button>

          <Button variant='outline' className='gap-2'>
            <Link to='/orders' className='flex items-center gap-1'>
              <PackageIcon className='h-4 w-4' aria-hidden />
              View orders
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
