import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddIcon from '@material-ui/icons/Add';

import {useContext } from 'react';
import  {AppContext}  from '../../Context';
const ProductListAdd = ({handleProductInsert}) => {
    const [newData,setNewData] = useState({});
    const {
        insertProduct,
      } = useContext(AppContext);   
    const addNewData = (e,field) =>{
        setNewData({...newData,[field]:e.target.value});
    };

    const sendNewData = () =>{

        insertProduct(newData);
    }
    return(
        <Card >
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Button color="primary" variant="contained" onClick={() => handleProductInsert()}>
                        返回
                    </Button>
                    <Button color="secondary" variant="contained" startIcon={<AddIcon />} onClick={() => sendNewData()}>
                        確定
                    </Button>
                <Table>
                    <TableHead>
                        <TableRow> 
                            <TableCell>
                            商品編號
                            </TableCell>
                            <TableCell>
                            商品名稱
                            </TableCell>
                            <TableCell>
                            定價
                            </TableCell>
                            <TableCell>
                            成本
                            </TableCell>             
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>               
                            <TableCell>
                                <TextField
                                    type="text"
                                    onChange={(e) => addNewData(e, "ProdId")}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="text"   
                                    onChange={(e) => addNewData(e, "ProdName")}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="text"
                                    onChange={(e) => addNewData(e, "UnitPrice")}
                                />                                              
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="text"
                                    onChange={(e) => addNewData(e, "Cost")}
                                />       
                            </TableCell>  
                        </TableRow>
                    </TableBody>
                </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}
export default ProductListAdd; 