// OrderChatPage.tsx

import { HeadphonesIcon, VideoIcon } from 'lucide-react';
import { PageError } from '../components/PageError.jsx';
import { useOrderChatPage } from '../hooks/useOrderChatPage.js';

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

import { OrderChatPanelSkeleton } from '../components/LoadingSkeleton.js';

import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

function OrderChatPage() {
  const { paid, client, error, channel, canInvite, inviteMutation } =
    useOrderChatPage();

  if (!paid) {
    return (
      <p className='text-sm text-muted-foreground'>
        Complete payment to open support chat.
      </p>
    );
  }

  if (error) {
    return <PageError message={error} />;
  }

  if (!client || !channel) {
    return <OrderChatPanelSkeleton />;
  }

  return (
    <div className='space-y-4 text-left'>
      <Card className='border-border bg-card shadow-sm'>
        <CardContent className='flex flex-row flex-wrap items-start gap-4 p-6'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
            <HeadphonesIcon className='h-6 w-6' />
          </div>

          <div className='flex-1'>
            <h3 className='text-base font-semibold'>Message support</h3>

            <p className='mt-1 text-sm text-muted-foreground'>
              Ask about this order, shipping, or returns. Support can send a
              video call link here when needed.
            </p>

            {canInvite && (
              <div className='mt-4 flex flex-wrap items-center gap-2'>
                <Button
                  size='sm'
                  variant='secondary'
                  disabled={inviteMutation.isPending}
                  onClick={() => inviteMutation.mutate()}
                  className='gap-2'
                >
                  {inviteMutation.isPending ? (
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  ) : (
                    <VideoIcon className='h-4 w-4' />
                  )}
                  Send video call invite
                </Button>

                {inviteMutation.isError && (
                  <span className='text-sm text-destructive'>
                    Could not send invite.
                  </span>
                )}

                {inviteMutation.isSuccess && (
                  <span className='text-sm text-green-600 dark:text-green-400'>
                    Invite sent.
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className='h-140 overflow-hidden rounded-2xl border border-border bg-zinc-950 [&_.str-chat__main-panel]:min-h-0'>
        <Chat client={client} theme='messaging str-chat__theme-dark'>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>

            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}

export default OrderChatPage;
