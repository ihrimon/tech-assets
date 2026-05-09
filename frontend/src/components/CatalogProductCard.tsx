import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useCart } from '../store/cart.js';
import { formatPrice } from '../utils/format.js';
import { IK_PRESETS, imageKitOptimizedUrl } from '../lib/imageKitUrl.js';

export function CatalogProductCard({ product }: { product: any }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <Card className='group flex h-full flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl'>
      <Link
        to={`/product/${product.slug}`}
        className='relative block overflow-hidden'
      >
        <figure className='aspect-4/3 bg-muted'>
          {product.imageUrl ? (
            <img
              src={imageKitOptimizedUrl(
                product.imageUrl,
                IK_PRESETS.catalogCard,
              )}
              alt={product.name}
              className='h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]'
              loading='lazy'
              decoding='async'
            />
          ) : (
            <div className='h-full w-full bg-muted' />
          )}
        </figure>

        <Badge
          variant='secondary'
          className='absolute left-3 top-3 border bg-background/90 backdrop-blur'
        >
          {product.category ?? 'General'}
        </Badge>
      </Link>

      <CardContent className='flex grow flex-col gap-3 p-5 text-left'>
        <Link
          to={`/product/${product.slug}`}
          className='line-clamp-2 text-lg font-semibold transition-colors hover:text-primary'
        >
          {product.name}
        </Link>

        <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
          {product.description}
        </p>

        <div className='mt-auto flex items-center justify-between border-t pt-4'>
          <span className='text-lg font-bold tabular-nums text-foreground'>
            {formatPrice(product.priceCents, product.currency)}
          </span>

          <Button
            size='sm'
            className='gap-1'
            onClick={() => addItem(product.id)}
          >
            <PlusIcon className='size-4' />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
