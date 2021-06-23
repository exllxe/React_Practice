import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from 'src/components/order/OrderListResults';
import CustomerListToolbar from 'src/components/order/ProductListToolbar';
//import customers from 'src/__mocks__/customers';

import {useContext } from 'react';
import  {AppContext}  from '../Context';
window.sessionStorage.setItem("getOrderData",'true')
const OrderList = () => {

  const {
    orders,
    selectOrder,
  } = useContext(AppContext);

  useEffect(() => {
    if(window.sessionStorage.getItem("getOrderData") === 'true'){
      window.sessionStorage.setItem("getOrderData",'false');
      selectOrder()
    }   
  });
  return (

      <>
        <Helmet>
          <title>Customers | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ pt: 3 }}>
              <OrderListResults orders={orders} />
            </Box>
          </Container>
        </Box>
      </>
  );
}

export default OrderList;
