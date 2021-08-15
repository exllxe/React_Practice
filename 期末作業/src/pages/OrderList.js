import { useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from 'src/components/order/OrderListResults';
//import SearchBar from 'src/components//SearchBar';
import OrderListAdd from 'src/components/order/OrderListAdd';

import {useContext } from 'react';
import  {AppContext}  from '../Context';

const OrderList = () => {
  const {
    orders,
    selectOrder,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [insertMode,setInsertMode] = useState(false);
  const [keyWord,setKeyWord] = useState("");
  const handleOrderKeyWord = (e) => {
    setKeyWord(e.target.value);
    selectOrder(e.target.value);
  }
  const handleOrderInsert = () => {            
    setInsertMode(!insertMode);
  };
  useEffect(() => {
    const loginData = JSON.parse(window.sessionStorage.getItem("login"));
    try{
      if(loginData.status && loginData.account !== ""){
        selectOrder("");
      }
    }catch (e){
      console.log(e);
      alert("請先登入")
      navigate('/login', { replace: true });
    }
  }, []);
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
          {
            () =>{
              return insertMode === true ?(
                <Container maxWidth={false}>
                  <Box sx={{ pt: 3 }}>
                    <OrderListAdd handleOrderInsert={handleOrderInsert} />
                  </Box>
                </Container>
              ):(
                  <OrderListResults orders={orders} handleOrderInsert={handleOrderInsert} handleOrderKeyWord={handleOrderKeyWord} keyWord={keyWord}/>
              )
          }}
        </Box>
      </>
  );
}

export default OrderList;
