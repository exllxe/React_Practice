import { useEffect,useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SearchBar from 'src/components//SearchBar';
import Content from 'src/components/salesReport/content';

import {useContext } from 'react';
import  {AppContext}  from '../Context';

const SalesReport = () => {
  
  const navigate = useNavigate();
  const {
    salesData,
    selectSalesReport,
  } = useContext(AppContext);
  const handleProductKeyWord = (e) => {
    selectSalesReport(e.target.value);
  }

  useEffect(() => {
    const loginData = JSON.parse(window.sessionStorage.getItem("login"));
    try{
      if(loginData.status && loginData.account !== ""){
        selectSalesReport("");
      }
    }catch (e){
      console.log(e);
      alert("請先登入")
      navigate('/login', { replace: true });
    }
  },[]);
  
  return (
      <>
        <Helmet>
          <title>a-----</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          {
            () =>{
              return(
                <Container maxWidth={false}>
                  <SearchBar handleKeyWord ={handleProductKeyWord} hint={"Search Customer ID"}/>
                  <Box sx={{ pt: 3 }}>
                    <Content salesData={salesData}/>
                  </Box>
                </Container>
              )
            }
            
          }

        </Box>
      </>
  );
}
export default SalesReport;
