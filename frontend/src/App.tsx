import { useAuth } from '@clerk/react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import PageLoader from './components/PageLoader';
import CartPage from './pages/CartPage';
import CheckoutReturnPage from './pages/CheckoutReturnPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrderPage';
import ProductDetailPage from './pages/ProductDetailsPage';

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:slug' element={<ProductDetailPage />} />
        <Route
          path='/orders'
          element={isSignedIn ? <OrdersPage /> : <Navigate to={'/'} replace />}
        />
        <Route path='/checkout/return' element={<CheckoutReturnPage />} />

        {/* <Route path='/demo-sentry' element={<SentryDemoPage />} /> */}

        {/* <Route
          path='/orders/:id/call'
          element={
            isSignedIn ? <OrderVideoPage /> : <Navigate to={'/'} replace />
          }
        /> */}

        {/* <Route
          path='/admin'
          element={
            isSignedIn ? <AdminProductsPage /> : <Navigate to='/' replace />
          }
        /> */}

        {/* NESTED ROUTES */}
        {/* <Route path='/orders/:id' element={<OrderDetailPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path='chat' element={<OrderChatPage />} />
        </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;
