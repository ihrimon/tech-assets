import { useAuth } from '@clerk/react';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';

function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <PageLoader />;
  }
  return (
    <>
      <header>
        <Navbar />
        <button className='btn btn-primary'>DaisyUI Working</button>
      </header>
    </>
  );
}

export default App;
