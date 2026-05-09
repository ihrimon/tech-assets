// ProductDetailPage.tsx

import { Link } from 'react-router';
import { PageError } from '../components/PageError';
import { useProductPage } from '../hooks/useProductPage';
import { useCart } from '../store/cart';

import {
  ArrowLeftIcon,
  CheckIcon,
  ExternalLinkIcon,
  ShoppingCartIcon,
} from 'lucide-react';

import { formatPrice } from '../utils/format';

import { ProductPageSkeleton } from '../components/LoadingSkeleton';

import {
  IK_PRESETS,
  imageKitOptimizedUrl,
  imageKitWatermarkedUrl,
} from '../lib/imageKitUrl';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';

const HIGHLIGHTS = [
  'Secure checkout',
  'Support from your order after payment',
  'Specs listed for this catalog',
];

function ProductDetailPage() {
  const addItem = useCart((s: any) => s.addItem);

  const { product, isLoading, error } = useProductPage();

  if (isLoading) return <ProductPageSkeleton />;

  if (error || !product) {
    return (
      <PageError
        message='Product not found.'
        action={{ to: '/', label: 'Back to shop' }}
      />
    );
  }

  const p = product;

  const category = p.category ?? 'General';

  const watermarkedFullUrl = p.imageUrl
    ? imageKitWatermarkedUrl(p.imageUrl, IK_PRESETS.productHero)
    : null;

  return (
    <div>
      <nav className='text-sm text-muted-foreground'>
        <ol className='flex flex-wrap items-center gap-2'>
          <li>
            <Link to='/' className='hover:text-primary transition-colors'>
              Shop
            </Link>
          </li>

          <li>/</li>

          <li>
            <Link
              to={`/?category=${encodeURIComponent(category)}`}
              className='hover:text-primary transition-colors'
            >
              {category}
            </Link>
          </li>

          <li>/</li>

          <li className='text-foreground font-medium'>{p.name}</li>
        </ol>
      </nav>

      <div className='mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14'>
        <Card className='overflow-hidden border shadow-lg py-0'>
          <div className='aspect-square bg-muted'>
            {p.imageUrl ? (
              <img
                src={imageKitOptimizedUrl(p.imageUrl, IK_PRESETS.productHero)}
                alt=''
                className='h-full w-full object-cover'
                fetchPriority='high'
                decoding='async'
              />
            ) : (
              <div className='h-full w-full' />
            )}
          </div>

          {watermarkedFullUrl ? (
            <CardFooter className='border-t bg-muted/40 px-3 py-3'>
              <a
                href={watermarkedFullUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost' size='sm' className='gap-1'>
                  <ExternalLinkIcon className='h-3.5 w-3.5' />
                  Open full size
                </Button>
              </a>
            </CardFooter>
          ) : null}
        </Card>

        <div className='flex flex-col text-left'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='default'>{category}</Badge>

            <span className='text-xs font-mono text-muted-foreground'>
              {p.slug}
            </span>
          </div>

          <h1 className='mt-3 text-3xl font-bold tracking-tight md:text-4xl'>
            {p.name}
          </h1>

          <p className='mt-3 text-3xl font-bold text-primary tabular-nums md:text-4xl'>
            {formatPrice(p.priceCents, p.currency)}
          </p>

          <p className='mt-6 text-base leading-relaxed text-muted-foreground'>
            {p.description}
          </p>

          <Card className='mt-6 border bg-muted/40'>
            <CardContent className='space-y-3 p-4'>
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h}
                  className='flex items-center gap-2 text-sm text-muted-foreground'
                >
                  <CheckIcon className='h-4 w-4 shrink-0 text-green-500' />
                  {h}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Button
              size='lg'
              className='gap-1 shadow-lg flex items-center'
              onClick={() => addItem(p.id)}
            >
              <ShoppingCartIcon className='h-5 w-5' />
              Add to cart
            </Button>

            <Button size='lg' variant='outline' className='gap-2'>
              <Link to='/' className='flex items-center gap-1'>
                <ArrowLeftIcon className='h-4 w-4' />
                Continue shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
