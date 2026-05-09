import { Link, NavLink, Outlet } from 'react-router';

import {
  ArrowLeftIcon,
  HeadphonesIcon,
  LayoutListIcon,
  LockIcon,
  MessageCircleIcon,
} from 'lucide-react';

import { OrderDetailSkeleton } from '../components/LoadingSkeleton';
import { PageError } from '../components/PageError';
import { useOrderDetailPage } from '../hooks/useOrderDetailPage';
import { formatOrderWhen, formatPrice } from '../utils/format';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

import { cn } from '../lib/utils';

const tabClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-background text-foreground shadow-sm border'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted',
  );

function OrderDetailPage() {
  const { id, order, items, paid, isLoading, error } = useOrderDetailPage();

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error || !order) {
    return (
      <PageError
        message='Order not found.'
        action={{ to: '/orders', label: 'Back to orders' }}
      />
    );
  }

  return (
    <div className='space-y-8 text-left'>
      <Button
        asChild
        variant='ghost'
        size='sm'
        className='w-fit gap-2 px-0 text-muted-foreground hover:text-primary'
      >
        <Link to='/orders'>
          <ArrowLeftIcon className='h-4 w-4' />
          Back to orders
        </Link>
      </Button>

      <Card className='overflow-hidden rounded-2xl border shadow-lg'>
        <div className='bg-linear-to-br from-primary/10 via-background to-muted/60 px-5 py-6 sm:px-8 sm:py-8'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wider text-primary'>
                Order details
              </p>

              <h1 className='mt-1 font-mono text-2xl font-bold tracking-tight sm:text-3xl'>
                #{order.id.slice(0, 8)}
              </h1>

              <p className='mt-2 text-sm text-muted-foreground'>
                {formatOrderWhen(order.createdAt, {
                  dateStyle: 'full',
                })}
              </p>

              <p className='mt-2 break-all font-mono text-xs text-muted-foreground/70'>
                {order.id}
              </p>
            </div>

            <div className='flex flex-col gap-3 border-t pt-4 lg:border-none lg:pt-0 lg:text-right'>
              <Badge
                className={cn(
                  'w-fit capitalize lg:ml-auto',
                  paid
                    ? 'bg-green-600 hover:bg-green-600'
                    : order.status === 'pending'
                      ? 'bg-yellow-500 hover:bg-yellow-500'
                      : 'bg-red-500 hover:bg-red-500',
                )}
              >
                {order.status}
              </Badge>

              <div>
                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                  Order total
                </p>

                <p className='text-2xl font-bold tabular-nums sm:text-3xl'>
                  {formatPrice(order.totalCents, 'usd')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t bg-muted/40 px-5 py-4 sm:px-8'>
          <p className='max-w-3xl text-sm leading-relaxed text-muted-foreground'>
            Need help with shipping or returns? Open the{' '}
            <strong className='text-foreground'>Support chat</strong> tab after
            payment. Video call links are shared in that thread.
          </p>
        </div>
      </Card>

      <div>
        <div className='flex items-center gap-2 border-b pb-3'>
          <HeadphonesIcon className='h-5 w-5 text-primary' />

          <h2 className='text-sm font-semibold uppercase tracking-wide'>
            Customer support
          </h2>
        </div>

        <div className='mt-3 inline-flex flex-wrap items-center gap-2 rounded-xl border bg-muted/40 p-1'>
          <NavLink to={`/orders/${id}`} end className={tabClass}>
            <LayoutListIcon className='h-4 w-4 shrink-0' />
            Summary
          </NavLink>

          {paid ? (
            <NavLink to={`/orders/${id}/chat`} className={tabClass}>
              <MessageCircleIcon className='h-4 w-4 shrink-0' />
              Support chat
            </NavLink>
          ) : (
            <div className='inline-flex cursor-not-allowed items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground opacity-50'>
              <LockIcon className='h-4 w-4 shrink-0' />
              Support chat
            </div>
          )}
        </div>

        {!paid && (
          <div className='mt-4 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-700 dark:text-yellow-300'>
            <LockIcon className='mt-0.5 h-4 w-4 shrink-0' />

            <span>
              Support unlocks when this order is marked{' '}
              <strong className='text-foreground'>paid</strong>.
            </span>
          </div>
        )}

        <div className='mt-5'>
          <Outlet context={{ order, items, paid }} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
