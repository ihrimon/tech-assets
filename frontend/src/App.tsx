import { Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react';
import PageLoader from './components/PageLoader';

function App() {
  const {isLoaded} = useAuth();

  if (!isLoaded) {
    return <PageLoader />;
  }
  return (
    <>
      <header>
        <Show when='signed-out'>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when='signed-in'>
          <UserButton />
        </Show>
        <button className='btn'>Test</button>
        <button className='btn btn-primary'>Primary</button>
      </header>
    </>
  );
}

export default App;
