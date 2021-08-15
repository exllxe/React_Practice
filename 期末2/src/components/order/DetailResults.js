import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import {useContext } from 'react';
import  {AppContext}  from '../../Context';
import DetailResultsAdd from './DetailResultsAdd';

const DetailResults = ({orderId,handleModeChange}) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [newData, setNewData] = useState({});
    const [insertMode,setInsertMode] = useState(false);
    const {
        findOneProduct,
        orderDetail,
        cancelEdit,
        selectOrderDetail,
        selectSpecificProduct,
        updateOrderDetail,
        editMode,
        deleteOrderDetail,
    } = useContext(AppContext);
  
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        setPage(0);
    };

    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

    const updateNewData = (e, field) => {
      setNewData({
        ...newData,
        [field]: e.target.value,
      });
      if(field === 'ProdId'){
        selectSpecificProduct(e.target.value);
      }
    };
    const saveBtn = () => {
      updateOrderDetail(newData,orderId);
    };
    const enableEdit = (seq,OrderId,ProdId,Qty,Discount) => {
      setNewData({seq,OrderId,ProdId,Qty,Discount});
      editMode(seq,"orderdetail");
      selectSpecificProduct(ProdId);   //點開編輯後先找一次名字並顯示
    };
    const deleteConfirm = (targetId) => {
      if (window.confirm("Are you sure?")) {
        deleteOrderDetail(targetId,orderId);
      }
    };
    
    const handleDetailInsert = () => {            
      setInsertMode(!insertMode);
    };
    useEffect(() => {
      window.sessionStorage.setItem("OrderId",orderId);
      selectOrderDetail(window.sessionStorage.getItem("OrderId"));
    }, []);
  
  return insertMode === true ? (
    <DetailResultsAdd handleDetailInsert={handleDetailInsert}/>
  ):(
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Button color="primary" variant="contained" onClick={() => handleModeChange()}>
            返回
          </Button>
          <Button color="primary" variant="contained" startIcon={<AddIcon/>}onClick={() => handleDetailInsert()}>
            新增
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  序號
                </TableCell>
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
                <TableCell>
                  修改        
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetail.slice(page*limit, page*limit+limit).map((detail) => {
                return detail.Edit === true ?(
                  <TableRow
                    hover
                    key={detail.seq}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {detail.seq}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField     
                        defaultValue={detail.OrderId}
                        onChange={(e) => updateNewData(e, "OrderId")}
                      />
 
                    </TableCell> 
                    <TableCell>
                      <TextField     
                        defaultValue={detail.ProdId}
                        onChange={(e) => updateNewData(e, "ProdId")}
                      />          
                    </TableCell>
                    <TableCell>{findOneProduct}</TableCell>
                    <TableCell>
                      <TextField     
                        defaultValue={detail.Qty}
                        onChange={(e) => updateNewData(e, "Qty")}
                      />
                    </TableCell> 
                    <TableCell>
                      <TextField     
                        defaultValue={detail.Discount}
                        onChange={(e) => updateNewData(e, "Discount")}
                      />
                    </TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" onClick={() => saveBtn()}>
                        儲存
                      </Button>
                      <Button color="secondary" variant="contained" onClick={() => cancelEdit(detail.seq,"orderdetail")}>
                        取消
                      </Button>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    hover
                    key={detail.seq}
                  >

                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {detail.seq}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {detail.OrderId}
                    </TableCell>
                    <TableCell>
                      {detail.ProdId}
                    </TableCell>
                    <TableCell>
                      {detail.ProdName}
                    </TableCell>
                    <TableCell>
                      {detail.Qty}
                    </TableCell>
                    <TableCell>
                      {detail.Discount}
                    </TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" startIcon={<EditIcon/>}
                        onClick={() => enableEdit(detail.seq, detail.OrderId, detail.ProdId, detail.Qty,detail.Discount)}
                      >
                        編輯
                      </Button>
                      <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteConfirm(detail.seq)}>
                        刪除
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination

        component="div"
        count={orderDetail.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

  );
};
/*
DetailResults.propTypes = {
  orderDetail: PropTypes.array.isRequired
};*/

export default DetailResults;
