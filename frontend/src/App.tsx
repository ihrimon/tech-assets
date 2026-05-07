import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from '@clerk/react';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';

function App() {
  const { isLoaded } = useAuth();

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

        <Navbar />
        <button className='btn btn-primary'>DaisyUI Working</button>
      </header>
    </>
  );
}

export default App;
