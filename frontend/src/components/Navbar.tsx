import { Show, SignInButton, useAuth, UserButton } from '@clerk/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from 'lucide-react';

import { apiFetch } from '../lib/api';
import { Button } from './ui/button';
import { useCart } from '../store/cart';

const Navbar = () => {
  const { getToken, isSignedIn } = useAuth();

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiFetch('/api/me', { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;


 const cartCount = useCart((s) =>
   s.items.reduce((n, line) => n + line.quantity, 0),
 );

  return (
    <header className='sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link
            to='/'
            className='flex items-center gap-3 transition-opacity hover:opacity-90'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
              <StoreIcon className='h-6 w-6' />
            </div>

            <span className='font-mono text-lg font-bold uppercase tracking-wide'>
              TechAssets
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className='flex items-center gap-1 md:gap-3'>
          <Link to='/'>
            <Button
              variant='ghost'
              className='flex items-center gap-2 font-medium'
            >
              <ShoppingBagIcon className='h-5 w-5 opacity-80' />
              <span className='hidden sm:inline'>Shop</span>
            </Button>
          </Link>

          <Show when={'signed-in'}>
            <Link to='/orders'>
              <Button
                variant='ghost'
                className='flex items-center gap-2 font-medium'
              >
                <PackageIcon className='h-5 w-5 opacity-80' />
                <span className='hidden sm:inline'>Orders</span>
              </Button>
            </Link>

            {role === 'admin' && (
              <Link to='/admin'>
                <Button
                  variant='ghost'
                  className='flex items-center gap-2 font-medium text-primary'
                >
                  <SettingsIcon className='h-5 w-5' />
                  <span className='hidden sm:inline'>Admin</span>
                </Button>
              </Link>
            )}
          </Show>

          {/* Cart */}
          <Link to='/cart' className='relative'>
            <Button
              variant='ghost'
              className='flex items-center gap-2 font-medium'
            >
              {cartCount > 0 && (
                <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground'>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}

              <ShoppingCartIcon className='h-5 w-5 opacity-80' />
              <span className='hidden sm:inline'>Cart</span>
            </Button>
          </Link>

          <Show when={'signed-out'}>
            <SignInButton mode='modal'>
              <Button className='gap-2 h-9 shadow-sm'>
                <LogInIcon className='h-6 w-6' />
                Sign in
              </Button>
            </SignInButton>
          </Show>

          <Show when={'signed-in'}>
            <div className='ml-2 flex items-center gap-2 border-l pl-3'>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10 ring-2 ring-border rounded-full',
                  },
                }}
              />

              {(role === 'support' || role === 'admin') && (
                <span className='hidden rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium capitalize text-primary md:inline-flex'>
                  {role}
                </span>
              )}
            </div>
          </Show>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
