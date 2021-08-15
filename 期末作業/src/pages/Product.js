import { useEffect,useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProductListResults from 'src/components/product/ProductListResults';
import SearchBar from 'src/components//SearchBar';
import ProductListAdd from 'src/components/product/ProductListAdd';
//import customers from 'src/__mocks__/customers';

import {useContext } from 'react';
import  {AppContext}  from '../Context';

window.sessionStorage.setItem("getCustomerData",'true')
const ProductList = () => {
  
  const navigate = useNavigate();
  const {
    products,
    selectProduct,
  } = useContext(AppContext);
  const [insertMode,setInsertMode] = useState(false);
  const [keyWord,setKeyWord] = useState("");
  const handleProductKeyWord = (e) => {
    setKeyWord(e.target.value);
    selectProduct(e.target.value);
  }
  const handleProductInsert = () => {
    setInsertMode(!insertMode);
  };

  useEffect(() => {
    const loginData = JSON.parse(window.sessionStorage.getItem("login"));
    try{
      if(loginData.status && loginData.account !== ""){
        selectProduct("");
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
              return insertMode === true ?
                <Container maxWidth={false}>
                  <SearchBar handleKeyWord ={handleProductKeyWord} hint={"Search Serial number"}/>
                  <Box sx={{ pt: 3 }}>
                    <ProductListAdd handleProductInsert={handleProductInsert} />
                  </Box>
                </Container>
              :(
                <Container maxWidth={false}>
                  <SearchBar handleKeyWord ={handleProductKeyWord} hint={"Search Product ID"}/>
                  <Box sx={{ pt: 3 }}>
                    <ProductListResults products={products} handleProductInsert={handleProductInsert} keyWord={keyWord}/>
                  </Box>
                </Container>
              )
            }
            
          }

        </Box>
      </>
  );
}
export default ProductList;
