import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import {useContext } from 'react';
import  {AppContext}  from '../Context';


const AddNewProduct = () => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({});
  const {
    insertProduct,
  } = useContext(AppContext);
  const insertNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };
  const submitData = (e) => {
    insertProduct(newData);
  };
  const cancel = (e) => {
    window.sessionStorage.setItem("getCustomerData",'true');
    navigate('/app/customers', { replace: true });
  };
    return (
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead></TableHead>
                <TableBody>
                <TableRow>
                  <TableCell>
                    商品編號:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "ProdID")}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    商品名稱:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "ProdName")}
                    />
                  </TableCell>              
                </TableRow>
                <TableRow>
                  <TableCell>
                    定價:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "UnitPrice")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    成本:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "Cost")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button color="primary" variant="contained" onClick={()=>submitData()}>
                      新增
                    </Button>    
                    <Button color="primary" variant="contained" onClick={() => cancel()}>
                      取消
                    </Button>              
                  </TableCell>
                  
                </TableRow>
                </TableBody>
              </Table>

            </Box>
          </PerfectScrollbar>
        </Card>
      );
}

export default AddNewProduct;