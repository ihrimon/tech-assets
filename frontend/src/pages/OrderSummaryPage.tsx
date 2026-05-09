// OrderSummaryPage.tsx

import { ListOrderedIcon, PackageIcon } from 'lucide-react';
import { Link, useOutletContext } from 'react-router';

import { formatPrice } from '../utils/format';
import { IK_PRESETS, imageKitOptimizedUrl } from '../lib/imageKitUrl';

import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

function OrderSummaryPage() {
  const { order, items }: { order: any; items: any[] } = useOutletContext();

  return (
    <Card className='overflow-hidden rounded-2xl border shadow-md'>
      <CardHeader className='border-b bg-muted/40 px-6 py-5'>
        <h2 className='flex items-center gap-2 text-lg font-bold'>
          <ListOrderedIcon className='h-5 w-5 text-primary' />
          Line items
        </h2>

        <p className='text-sm text-muted-foreground'>
          {items.length} {items.length === 1 ? 'product' : 'products'} in this
          order
        </p>
      </CardHeader>

      <CardContent className='p-0'>
        <ul className='divide-y'>
          {items.map((row: any) => (
            <li key={row.id} className='px-6 py-5'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex flex-1 gap-4'>
                  <Link
                    to={`/product/${row.product.slug}`}
                    className='group relative overflow-hidden rounded-xl border bg-muted shadow-sm transition'
                  >
                    <div className='h-24 w-24 sm:h-28 sm:w-28'>
                      {row.product.imageUrl ? (
                        <img
                          src={imageKitOptimizedUrl(
                            row.product.imageUrl,
                            IK_PRESETS.orderLineThumb,
                          )}
                          alt=''
                          className='h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]'
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/70'>
                          <PackageIcon className='h-10 w-10 text-muted-foreground/40' />
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className='min-w-0 flex-1'>
                    <Link
                      to={`/product/${row.product.slug}`}
                      className='text-lg font-semibold hover:underline'
                    >
                      {row.product.name}
                    </Link>

                    {row.product.category && (
                      <p className='mt-1 text-sm text-muted-foreground'>
                        {row.product.category}
                      </p>
                    )}

                    <div className='mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
                      <Badge variant='secondary'>Qty {row.quantity}</Badge>

                      <span>
                        {formatPrice(row.unitPriceCents, row.product.currency)}{' '}
                        each
                      </span>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-3 sm:border-none sm:pt-0 sm:text-right'>
                  <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Subtotal
                  </span>

                  <div className='text-xl font-bold tabular-nums'>
                    {formatPrice(
                      row.unitPriceCents * row.quantity,
                      row.product.currency,
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className='flex items-center justify-between border-t bg-muted/40 px-6 py-5'>
          <span className='text-lg font-semibold'>Total</span>

          <span className='text-2xl font-bold text-primary'>
            {formatPrice(order.totalCents, 'usd')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummaryPage;
