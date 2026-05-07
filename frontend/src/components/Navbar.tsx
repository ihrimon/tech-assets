import { useAuth } from '@clerk/react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

const Navbar = () => {
  const { getToken, isSignedIn } = useAuth();

  const { data: meData } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiFetch('/api/me', { getToken }),
    enabled: isSignedIn,
  });

  console.log('meData', meData);
  return <div>Navbar</div>;
};

export default Navbar;
