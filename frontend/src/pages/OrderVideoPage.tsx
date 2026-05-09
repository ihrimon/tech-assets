// OrderVideoPage.tsx

import { Link, useNavigate } from 'react-router';

import { ArrowLeftIcon, VideoIcon } from 'lucide-react';

import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

import useOrderVideoPage from '../hooks/useOrderVideoPage.js';

import { PageError } from '../components/PageError';

import { OrderVideoSkeleton } from '../components/LoadingSkeleton.js';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

function OrderVideoPage() {
  const navigate = useNavigate();

  const { id, order, paid, isLoading, loadError, client, call, error } =
    useOrderVideoPage();

  if (isLoading) {
    return <OrderVideoSkeleton />;
  }

  if (loadError || !order) {
    return (
      <PageError
        message="Order not found or you don't have access."
        action={{
          to: '/orders',
          label: 'Back to orders',
        }}
      />
    );
  }

  if (!paid) {
    return (
      <div className='rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-300'>
        This order must be paid before you can join video support.
      </div>
    );
  }

  if (error) {
    return <PageError message={error} />;
  }

  if (!client || !call) {
    return (
      <div className='flex min-h-120 items-center justify-center rounded-2xl border bg-card'>
        <span className='h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  return (
    <div className='space-y-4 text-left'>
      <Button
        asChild
        variant='ghost'
        size='sm'
        className='w-fit gap-2 text-muted-foreground'
      >
        <Link to={`/orders/${id}/chat`}>
          <ArrowLeftIcon className='h-4 w-4' />
          Back to support chat
        </Link>
      </Button>

      <Card className='border shadow-sm'>
        <CardContent className='flex flex-row items-start gap-4 p-6'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
            <VideoIcon className='h-6 w-6' />
          </div>

          <div>
            <h1 className='text-lg font-semibold'>Video call</h1>

            <p className='mt-1 text-sm text-muted-foreground'>
              Same room as the invite link in chat. Allow camera and microphone
              when your browser asks.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className='flex min-h-[560px] flex-col overflow-hidden rounded-2xl border bg-card'>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme className='str-video__theme-custom'>
              <div className='flex min-h-0 flex-1 flex-col'>
                <div className='relative min-h-[460px] flex-1 bg-black text-white'>
                  <SpeakerLayout />
                </div>

                <div className='border-t bg-muted/40 px-2 py-3 [&_.str-video__call-controls]:flex-wrap [&_.str-video__call-controls]:justify-center'>
                  <CallControls
                    onLeave={() => navigate(`/orders/${id}/chat`)}
                  />
                </div>
              </div>
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      </div>
    </div>
  );
}

export default OrderVideoPage;
