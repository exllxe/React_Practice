import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import DetailResults from 'src/components/order/DetailResults';

import { useState, useContext } from 'react';
import  {AppContext}  from '../Context';

window.sessionStorage.setItem("getOrderDetail",'true')
const OrderDetailList = () => {
  
  const navigate = useNavigate();
  const {
    orderDetail,
    selectOrderDetail,
  } = useContext(AppContext);

  useEffect(() => {
    if(window.sessionStorage.getItem("getOrderDetail") === 'true'){
      window.sessionStorage.setItem("getOrderDetail",'false');
      let a = window.sessionStorage.getItem("orderId")
      console.log(a)
      selectOrderDetail(a)
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
            <Box sx={{ pt: 3 }}>
              <DetailResults details={{orderDetail}['orderDetail']} />
            </Box>
          </Container>
        </Box>
      </>
  );
}
export default OrderDetailList;
