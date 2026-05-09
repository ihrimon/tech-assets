import {
  HeadphonesIcon,
  LogInIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from 'lucide-react';
import useCartPage from '../hooks/useCartPage';
import { PageError } from '../components/PageError';
import { Link } from 'react-router';
import { formatPrice } from '../utils/format';
import { Show, SignInButton } from '@clerk/react';
import EmptyCart from '../components/EmptyCart';
import { CartSkeleton } from '../components/LoadingSkeleton';
import { IK_PRESETS, imageKitOptimizedUrl } from '../lib/imageKitUrl';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

function CartPage() {
  const {
    checkout,
    checkoutLoading,
    items,
    lines,
    productsError,
    productsLoading,
    removeItem,
    setQty,
    subtotal,
  } = useCartPage();

  return (
    <div className='text-left'>
      <h1 className='mb-8 flex items-center gap-2 text-3xl font-bold'>
        <ShoppingCartIcon className='h-8 w-8 text-primary' />
        Cart
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : productsLoading ? (
        <CartSkeleton lines={items.length} />
      ) : productsError ? (
        <PageError message='Could not load product details. Refresh the page or try again shortly.' />
      ) : (
        <div className='grid gap-10 lg:grid-cols-[1fr_320px]'>
          <ul className='space-y-4'>
            {lines.map(({ line, product: p }: any) => (
              <li key={line.productId}>
                <Card className='overflow-hidden border shadow-sm py-0'>
                  <CardContent className='flex flex-wrap items-center justify-between gap-4 p-4'>
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                      {p?.imageUrl ? (
                        <img
                          src={imageKitOptimizedUrl(
                            p.imageUrl,
                            IK_PRESETS.cartThumb,
                          )}
                          alt=''
                          className='h-24 w-24 rounded-xl object-cover border'
                          loading='lazy'
                          decoding='async'
                        />
                      ) : (
                        <div className='h-24 w-24 rounded-xl bg-muted border' />
                      )}

                      <div className='min-w-0 flex-1'>
                        <h3 className='text-base font-semibold truncate'>
                          {p ? (
                            <Link
                              to={`/product/${p.slug}`}
                              className='hover:text-primary transition-colors'
                            >
                              {p.name}
                            </Link>
                          ) : (
                            'Unknown product'
                          )}
                        </h3>

                        {p ? (
                          <p className='mt-1 text-sm text-muted-foreground'>
                            {formatPrice(p.priceCents, p.currency)} each
                          </p>
                        ) : null}

                        <div className='mt-3 flex flex-wrap items-center gap-3'>
                          <span className='text-sm text-muted-foreground'>
                            Qty
                          </span>

                          <div className='flex items-center overflow-hidden rounded-md border'>
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='rounded-none h-9 w-9'
                              onClick={() =>
                                setQty(line.productId, line.quantity - 1)
                              }
                            >
                              <MinusIcon className='h-4 w-4' />
                            </Button>

                            <div className='flex h-9 min-w-10 items-center justify-center border-x bg-muted px-3 text-sm font-medium tabular-nums'>
                              {line.quantity}
                            </div>

                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='rounded-none h-9 w-9'
                              onClick={() =>
                                setQty(
                                  line.productId,
                                  Math.min(99, line.quantity + 1),
                                )
                              }
                              disabled={line.quantity >= 99}
                            >
                              <PlusIcon className='h-4 w-4' />
                            </Button>
                          </div>

                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='text-destructive hover:text-destructive'
                            onClick={() => removeItem(line.productId)}
                          >
                            <Trash2Icon className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className='text-right font-semibold'>
                      {p
                        ? formatPrice(p.priceCents * line.quantity, p.currency)
                        : '-'}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <aside>
            <Card className='border shadow-md'>
              <CardContent className='p-6'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Subtotal</span>

                  <span className='font-semibold'>
                    {formatPrice(
                      subtotal,
                      lines[0]?.product?.currency ?? 'usd',
                    )}
                  </span>
                </div>

                <Separator className='my-5' />

                <Show when='signed-in'>
                  <Button
                    type='button'
                    className='w-full gap-2'
                    onClick={checkout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    ) : (
                      <ShoppingCartIcon className='h-4 w-4' />
                    )}

                    {checkoutLoading
                      ? 'Opening checkout…'
                      : 'Checkout securely'}
                  </Button>
                </Show>

                <Show when='signed-out'>
                  <SignInButton mode='modal'>
                    <Button
                      type='button'
                      variant='outline'
                      className='w-full gap-2'
                    >
                      <LogInIcon className='h-4 w-4' />
                      Sign in to checkout
                    </Button>
                  </SignInButton>
                </Show>

                <div className='mt-4 flex items-start gap-2 text-xs text-muted-foreground'>
                  <HeadphonesIcon className='mt-0.5 h-3.5 w-3.5 shrink-0 text-primary' />

                  <span>
                    After payment, open your order for{' '}
                    <strong className='text-foreground'>support chat</strong>.
                    Video invites appear in that thread.
                  </span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
