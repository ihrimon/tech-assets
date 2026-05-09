import {
  CreditCardIcon,
  HeadphonesIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react';

const items = [
  {
    icon: TruckIcon,
    title: 'Fulfillment',
    desc: 'Structured catalog & inventory-ready model',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure pay',
    desc: 'Encrypted payments and order confirmation',
  },
  {
    icon: CreditCardIcon,
    title: 'Transparent',
    desc: 'Prices in USD, tax where applicable',
  },
  {
    icon: HeadphonesIcon,
    title: 'Human support',
    desc: 'Order-scoped chat + optional video',
  },
];

export function TrustStrip() {
  return (
    <section className='grid gap-4 rounded-3xl border bg-background p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4'>
      {items.map(({ icon, title, desc }) => {
        const IconCmp = icon;

        return (
          <div
            key={title}
            className='flex gap-4 rounded-2xl p-2 transition-colors hover:bg-muted/40'
          >
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
              <IconCmp className='h-5 w-5' />
            </div>

            <div>
              <h3 className='font-semibold text-foreground'>{title}</h3>

              <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                {desc}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
