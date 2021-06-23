import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import OrderList from 'src/pages/OrderList';
import OrderDetailList from 'src/pages/OrderDetailList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AddNewProduct from 'src/pages/AddNewProduct';
import AddNewOrder from 'src/pages/AddNewOrder';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'orders', element: <OrderList /> },
      { path: 'orderdetail', element: <OrderDetailList /> },
      { path: 'addproducts', element: <AddNewProduct /> },
      { path: 'addorders', element: <AddNewOrder /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
