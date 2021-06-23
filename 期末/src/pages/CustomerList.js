import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
//import customers from 'src/__mocks__/customers';

import { useState, useContext } from 'react';
import  {AppContext}  from '../Context';

window.sessionStorage.setItem("getCustomerData",'true')
const CustomerList = () => {
  
  const navigate = useNavigate();
  const {
    products,
    selectProduct,
  } = useContext(AppContext);

  useEffect(() => {


    let check =window.sessionStorage.getItem("loggeSuccess")
    if(check !== '1'){
      navigate('/login', { replace: true });
    }

    if(window.sessionStorage.getItem("logout") === 'false'){
      window.sessionStorage.setItem("logout",'true');
    }
    console.log(window.sessionStorage.getItem("getCustomerData"))
    if(window.sessionStorage.getItem("getCustomerData") === 'true'){
      window.sessionStorage.setItem("getCustomerData",'false');
      selectProduct()
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
              <CustomerListResults customers={products} />
            </Box>
          </Container>
        </Box>
      </>
  );
}
export default CustomerList;
