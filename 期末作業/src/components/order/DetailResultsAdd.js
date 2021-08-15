import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import {useContext } from 'react';
import  {AppContext}  from '../../Context';
const DetailResultsAdd = ({handleDetailInsert}) => {
    const [newData,setNewData] = useState({"OrderId":window.sessionStorage.getItem("OrderId")});
    const {
        insertOrderDetail,
        selectSpecificProduct,
        findOneProduct
      } = useContext(AppContext);   
    const addNewData = (e,field) =>{
        setNewData({...newData,[field]:e.target.value});
        if(field === 'ProdId'){
            selectSpecificProduct(e.target.value);
        }
    };
    const sendNewData = () =>{
        insertOrderDetail(newData);
    }
    return(
            <Box sx={{ minWidth: 1050 }}>
                <Button color="primary" variant="contained" onClick={() => handleDetailInsert()}>
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
                        產品代號
                        </TableCell>
                        <TableCell>
                        產品名稱
                        </TableCell>
                        <TableCell>
                        數量   
                        </TableCell>
                        <TableCell>
                        折扣     
                        </TableCell>           
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>               
                        <TableCell>{window.sessionStorage.getItem("OrderId")}</TableCell>
                        <TableCell>
                            <TextField     
                                type="text"
                                onChange={(e) => addNewData(e, "ProdId")}
                            />       
                        </TableCell> 
                        <TableCell>{findOneProduct}</TableCell>
                        <TableCell>
                            <TextField     
                                type="text"
                                onChange={(e) => addNewData(e, "Qty")}
                            />         
                        </TableCell>   
                        <TableCell>
                        <TextField     
                                type="text"
                                onChange={(e) => addNewData(e, "Discount")}
                            />   
                        </TableCell>  
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
    )
}
export default DetailResultsAdd; 