import { Link } from 'react-router';
import { HeadphonesIcon, TruckIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
        <div className='grid gap-10 md:grid-cols-4'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-3 font-semibold text-foreground'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <TruckIcon className='h-6 w-6' />
              </div>

              <span className='text-lg'>TechAssets</span>
            </div>

            <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
              Curated hardware and workspace tools. Paid orders include priority
              support; chat with our team and join a video call when we share a
              link.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Shop
            </h3>

            <ul className='mt-4 space-y-3 text-sm'>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  All products
                </Link>
              </li>

              <li>
                <Link
                  to='/cart'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to='/orders'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Support
            </h3>

            <div className='mt-4 flex items-start gap-3'>
              <div className='mt-0.5 text-primary'>
                <HeadphonesIcon className='h-5 w-5' />
              </div>

              <p className='text-sm leading-relaxed text-muted-foreground'>
                Order-scoped chat after payment; video links shared in-thread.
              </p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Company
            </h3>

            <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
              Built for teams who care about clear specs, fast fulfillment, and
              human support when it matters.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-10 border-t pt-6'>
          <p className='text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} TechAssets · All prices in USD
          </p>
        </div>
      </div>
    </footer>
  );
}
