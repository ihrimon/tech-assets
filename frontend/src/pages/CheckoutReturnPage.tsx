// CheckoutReturnPage.tsx
import { Link, useSearchParams } from 'react-router';
import { useCart } from '../store/cart';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { CheckCircle2Icon, PackageIcon } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

function CheckoutReturnPage() {
  const clearCart = useCart((s: any) => s.clear);

  const [params] = useSearchParams();
  const checkoutId = params.get('checkout_id');

  const queryClient = useQueryClient();

  useEffect(() => {
    clearCart();
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  }, [queryClient, clearCart]);

  return (
    <div className='mx-auto max-w-lg'>
      <Card className='border text-center shadow-sm'>
        <CardContent className='space-y-6 p-8'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400'>
            <CheckCircle2Icon className='size-10' />
          </div>

          <div>
            <h1 className='text-2xl font-bold'>Thanks for your order</h1>

            <p className='mt-4 leading-relaxed text-muted-foreground'>
              Your order is created after payment is confirmed. Open it from
              your orders list for support chat and video invites.
            </p>

            {checkoutId ? (
              <p className='mt-4 break-all rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground'>
                Checkout: {checkoutId}
              </p>
            ) : null}
          </div>

          <Button>
            <Link to='/orders' className='flex items-center gap-1'>
              <PackageIcon className='size-4' />
              View orders
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckoutReturnPage;
