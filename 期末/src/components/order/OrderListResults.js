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
import  {AppContext}  from '../../Context';


const OrderListResults = ({ orders, ...rest }) => {
  const navigate = useNavigate();
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState({});
  const {
    cancelEdit,
    updateOrder,
    editMode,
    deleteOrder,
    selectOrderDetail,
  } = useContext(AppContext);
  
  const handleSelectOne = (event,id) => {
    const selectedIndex = selectedOrderIds.indexOf(id);

    let newSelectedOrderIds = [];
    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id);    
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(1));
    } else if (selectedIndex === selectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }
    setSelectedOrderIds(newSelectedOrderIds);
    
  };
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
    updateOrder(newData);
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
  const addOrder = () => {
    navigate('/app/addorders', { replace: true });
  };
  const detail = (id) => {
    selectOrderDetail(id)
  };
  
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Button color="primary" variant="contained" onClick={() => deleteConfirm(selectedOrderIds)}>
            Delete order
          </Button>
          <Button color="primary" variant="contained" onClick={() => addOrder()}>
            Add order
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0
                      && selectedOrderIds.length < orders.length
                    }
                    //onChange={handleSelectAll}
                  />
                </TableCell>
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
              {orders.slice(page*limit, page*limit+limit).map((order) => {
                return order.Edit === true ?(
                  <TableRow
                    hover
                    key={order.OrderId}
                    selected={selectedOrderIds.indexOf(order.OrderId) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrderIds.indexOf(order.OrderId) !== -1}
                        onChange={(event) => handleSelectOne(event, order.OrderId)}
                        value="true"
                      />
                    </TableCell>
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
                          {order.seq}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {order.OrderId}
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={order.EmpId}
                          onChange={(e) => updateNewData(e, "EmpId")}
                      />                      
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={order.CustId}
                          onChange={(e) => updateNewData(e, "CustId")}
                      />   
                    </TableCell> 
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={order.OrderDate}
                          onChange={(e) => updateNewData(e, "OrderDate")}
                      />   
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={order.Descript}
                          onChange={(e) => updateNewData(e, "Descript")}
                      />   
                    </TableCell> 
                    <TableCell>
                      <button className="btn green-btn" onClick={() => saveBtn()}>
                        Save
                      </button>
                      <button
                        className="btn default-btn"
                        onClick={() => cancelEdit(order.OrderId,"order")}
                      >
                        Cancel
                      </button>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    hover
                    key={order.OrderId}
                    selected={selectedOrderIds.indexOf(order.OrderId) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrderIds.indexOf(order.OrderId) !== -1}
                        onChange={(event) => handleSelectOne(event, order.OrderId)}
                        value="true"
                      />
                    </TableCell>
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
                          {order.seq}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {order.OrderId}
                      <Button color="primary" variant="contained" onClick={() => detail(order.OrderId)}>
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
                      <button
                      className="btn default-btn"
                      onClick={() => enableEdit(order.seq,order.OrderId,order.EmpId, order.CustId, order.OrderDate,order.Descript)}
                      >
                      Edit
                    </button>
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
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderListResults;
