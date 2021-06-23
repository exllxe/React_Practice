import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import {useContext } from 'react';
import  {AppContext}  from '../Context';


const AddNewOrder = () => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({"EmpId":window.sessionStorage.getItem("loggeId")});
  const {
    insertOrder,
  } = useContext(AppContext);
  const insertNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };
  const submitData = (e) => {
    insertOrder(newData,window.sessionStorage.getItem("loggeId"));
  };
  const cancel = (e) => {
    window.sessionStorage.setItem("getCustomerData",'true');
    navigate('/app/orders', { replace: true });
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
                    序號:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "seq")}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    訂單編號:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "OrderId")}
                    />
                  </TableCell>              
                </TableRow>
                <TableRow>
                  <TableCell>
                    客戶代號:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "CustId")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    訂貨日期:
                    <input
                      type="date"               
                      onChange={(e) => insertNewData(e, "OrderDate")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    備註:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "Descript")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    產品代號:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "ProdId")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    數量:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "Qty")}
                    />                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    折扣:
                    <input
                      type="text"               
                      onChange={(e) => insertNewData(e, "Discount")}
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

export default AddNewOrder;