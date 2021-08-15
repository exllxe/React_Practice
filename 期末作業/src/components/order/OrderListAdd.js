import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';


import {useContext } from 'react';
import  {AppContext}  from '../../Context';
const OrderListAdd = ({handleOrderInsert}) => {
    const [newData,setNewData] = useState({"EmpId":window.sessionStorage.getItem("empId"), "Descript":""});
    const {
        findOneCustomer,
        insertOrder,
        selectSpecificCustomer
      } = useContext(AppContext);   
    const addNewData = (e,field) =>{
        setNewData({...newData,[field]:e.target.value});
        if(field === 'CustId'){
            selectSpecificCustomer(e.target.value);
        }        
    };
    const sendNewData = () =>{
        insertOrder(newData);
    }

    return(
            <Box sx={{ minWidth: 1050 }}>
                <Button color="primary" variant="contained" onClick={() => handleOrderInsert()}>
                    返回
                </Button>
                <Button color="secondary" variant="contained" onClick={() => sendNewData()}>
                    確定
                </Button>
            <Table>
                <TableHead>
                    <TableRow> 
                        <TableCell>
                        訂單編號
                        </TableCell>
                        <TableCell>
                        員工代號
                        </TableCell>
                        <TableCell>
                        客戶代號
                        </TableCell>
                        <TableCell>
                        客戶名稱
                        </TableCell>
                        <TableCell>
                        訂貨日期        
                        </TableCell>
                        <TableCell>
                        備註        
                        </TableCell>           
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>               
                    <TableCell>
                        <TextField
                            type="text" 
                            onChange={(e) => addNewData(e, "OrderId")}
                        />    
                    </TableCell>
                        <TableCell>{window.sessionStorage.getItem("empId")}</TableCell>
                        <TableCell>
                            <TextField
                                type="text" 
                                onChange={(e) => addNewData(e, "CustId")}
                            />   
  
                        </TableCell> 
                        <TableCell>{findOneCustomer}</TableCell>
                        <TableCell>
                            <TextField
                                type="text" 
                                onChange={(e) => addNewData(e, "OrderDate")}
                            />   
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="text" 
                                onChange={(e) => addNewData(e, "Descript")}
                            />   
                        </TableCell>   
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
    )
}
export default OrderListAdd; 