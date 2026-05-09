// OrdersPage.tsx
import { ChevronRightIcon, PackageIcon } from 'lucide-react';
import { PageError } from '../components/PageError';
import useOrdersPage from '../hooks/useOrdersPage';
import { Link } from 'react-router';

import { formatOrderWhen, formatPrice } from '../utils/format';
import { OrdersListSkeleton } from '../components/LoadingSkeleton';
import { OrderPreview } from '../components/OrderPreview';

import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

function OrdersPage() {
  const { isLoading, error, orders, staff } = useOrdersPage();

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-10 w-64 animate-pulse rounded-md bg-muted' />
        <div className='h-4 w-96 animate-pulse rounded-md bg-muted' />

        <OrdersListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <PageError
        message='Could not load orders.'
        action={{ to: '/', label: 'Back to shop' }}
      />
    );
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='flex items-center gap-3 text-3xl font-bold tracking-tight'>
          <PackageIcon className='size-8 text-primary' />

          {staff ? 'Orders' : 'Your orders'}
        </h1>

        <p className='mt-2 text-sm text-muted-foreground'>
          {staff
            ? 'All store orders. Open one for customer support chat.'
            : 'Paid orders include customer support: open an order for chat.'}
        </p>
      </div>

      {orders.length === 0 ? (
        <p className='text-muted-foreground'>
          No orders yet.{' '}
          <Link to='/' className='font-medium text-primary hover:underline'>
            Browse the shop
          </Link>
        </p>
      ) : (
        <ul className='space-y-4'>
          {orders.map((o: any) => {
            const previewItems = o.previewItems ?? [];

            const totalUnits = previewItems.reduce(
              (sum: number, row: any) => sum + row.quantity,
              0,
            );

            const lineCount = previewItems.length;

            const summary =
              lineCount === 0
                ? 'No line items'
                : lineCount === 1
                  ? `${totalUnits} ${totalUnits === 1 ? 'item' : 'items'}`
                  : `${lineCount} products · ${totalUnits} items`;

            return (
              <li key={o.id}>
                <Link to={`/orders/${o.id}`} className='block'>
                  <Card className='group border transition-all hover:border-primary/40 hover:shadow-md'>
                    <CardContent className='flex flex-wrap items-center gap-5 py-5'>
                      <OrderPreview items={previewItems} />

                      <div className='flex-1'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='font-mono text-xs text-muted-foreground sm:text-sm'>
                            {o.id.slice(0, 8)}…
                          </span>

                          <Badge
                            variant={
                              o.status === 'paid'
                                ? 'default'
                                : o.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                            className='capitalize'
                          >
                            {o.status}
                          </Badge>
                        </div>

                        <p className='mt-2 text-sm text-muted-foreground'>
                          {formatOrderWhen(o.createdAt)}
                        </p>

                        <p className='mt-2 text-sm text-muted-foreground'>
                          {summary}
                        </p>
                      </div>

                      <div className='flex items-center gap-4'>
                        <div className='text-right'>
                          <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                            Total
                          </p>

                          <p className='text-xl font-bold tabular-nums'>
                            {formatPrice(o.totalCents, 'usd')}
                          </p>
                        </div>

                        <ChevronRightIcon className='size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary' />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;
