import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Container,
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
import SearchBar from 'src/components//SearchBar';
import DetailResults from './DetailResults';

const OrderListResults = ({ orders, handleOrderInsert,handleOrderKeyWord,keyWord}) => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState({});
  const [detailMode, setDetailMode] = useState(false);
  const [targetId, setTargetId] = useState(false);

  const {
    cancelEdit,
    updateOrder,
    editMode,
    deleteOrder,
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
  };
  const saveBtn = () => {
    updateOrder(newData,keyWord);
  };
  const enableEdit = (seq,OrderId,EmpId,CustId,OrderDate,Descript) => {
    
    setNewData({ seq,OrderId,EmpId,CustId,OrderDate,Descript});
    editMode(OrderId,"order");
  };
  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteOrder(id);
    }
  };
  const handleDetailSelect = (id) => {
    console.log(id);
    setTargetId(id);
    handleModeChange();
  };
  const handleModeChange = () =>{
    setDetailMode(!detailMode);
  }
  return detailMode === true ? ( //判斷是否開啟明細
    <Container maxWidth={false}>
      <Box sx={{ pt: 3 }}>   
        <DetailResults orderId = {targetId} handleModeChange = {handleModeChange}/>
      </Box>
    </Container>
  ):(

    <Container maxWidth={false}>
      <SearchBar handleKeyWord={handleOrderKeyWord} hint={"Search Order ID"}/>
      <Box sx={{ pt: 3 }}>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>

              <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={() => (handleOrderInsert())} >
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
                      員工代號
                    </TableCell>
                    <TableCell>
                      客戶代號
                    </TableCell>
                    <TableCell>
                      訂貨日期        
                    </TableCell>
                    <TableCell>
                      備註        
                    </TableCell>
                    <TableCell>
                      修改        
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(page*limit, page*limit+limit).map((order,index) => {
                    return order.Edit === true ?(
                      <TableRow
                        hover
                        key={(index+1)+(page*limit)}  
                      
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
                              {(index+1)+(page*limit)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <TextField     
                            type="text"
                            defaultValue={order.OrderId}
                            onChange={(e) => updateNewData(e, "OrderId")}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField  
                            type="text"   
                            defaultValue={order.EmpId}
                            onChange={(e) => updateNewData(e, "EmpId")}
                          />                     
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="text"    
                            defaultValue={order.CustId}
                            onChange={(e) => updateNewData(e, "CustId")}
                          />
                        </TableCell> 
                        <TableCell>
                          <TextField
                            type="date"
                            defaultValue={order.OrderDate}
                            onChange={(e) => updateNewData(e, "OrderDate")}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="text"   
                            defaultValue={order.Descript}
                            onChange={(e) => updateNewData(e, "Descript")}
                          />
                        </TableCell> 
                        <TableCell>
                          <Button color="primary" variant="contained" onClick={() => saveBtn()}>
                            儲存
                          </Button>
                          <Button color="secondary" variant="contained" onClick={() => cancelEdit(order.OrderId,"order")}>
                            取消
                          </Button>
                        </TableCell>
                      </TableRow>
                    ):(
                      <TableRow
                        hover
                        key={(index+1)+(page*limit)}   
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
                              {(index+1)+(page*limit)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {order.OrderId}
                          <Button color="primary" variant="contained" onClick={() => handleDetailSelect(order.OrderId)}>
                            明細
                          </Button>
                        </TableCell>
                        <TableCell>
                          {order.EmpId}
                        </TableCell>
                        <TableCell>
                          {order.CustId}
                        </TableCell>
                        <TableCell>
                          {order.OrderDate}
                        </TableCell>
                        <TableCell>
                          {order.Descript}
                        </TableCell>
                        <TableCell>
                          <Button color="primary" variant="contained" startIcon={<EditIcon/>}
                            onClick={() => enableEdit(order.seq,order.OrderId,order.EmpId, order.CustId, order.OrderDate,order.Descript)}
                          >
                            編輯
                          </Button>
                          <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteConfirm(order.OrderId)}>
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
            count={orders.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </Container>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderListResults;
