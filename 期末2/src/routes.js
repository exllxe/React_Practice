import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import ProductList from 'src/pages/Product';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import OrderList from 'src/pages/OrderList';
import SalesReport from 'src/pages/SalesReport';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'products', element: <ProductList /> },
      { path: 'orders', element: <OrderList /> },
      { path: 'salesreport', element: <SalesReport /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
