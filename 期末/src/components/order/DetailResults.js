import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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


const DetailResults = ({ details, ...rest }) => {
    const navigate = useNavigate();
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [newData, setNewData] = useState({});
    const {
        cancelEdit,
        updateOrderDetail,
        editMode,
        deleteOrderDetail,
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
      updateOrderDetail(newData);
    };
    const enableEdit = (seq,OrderId,ProdId,Qty,Discount) => {
      
      setNewData({seq,OrderId,ProdId,Qty,Discount});
      editMode(seq,"orderdetail");
    };
    const deleteConfirm = (id) => {
      if (window.confirm("Are you sure?")) {
        deleteOrderDetail(id);
      }
    };
    
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Button color="primary" variant="contained" onClick={() => deleteConfirm(selectedOrderIds)}>
            Delete Order
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrderIds.length === details.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0
                      && selectedOrderIds.length < details.length
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
                  產品代號
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
              {details.slice(page*limit, page*limit+limit).map((detail) => {
                return detail.Edit === true ?(
                  <TableRow
                    hover
                    key={detail.seq}
                    selected={selectedOrderIds.indexOf(detail.seq) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrderIds.indexOf(detail.seq) !== -1}
                        onChange={(event) => handleSelectOne(event, detail.seq)}
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
                          {detail.seq}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={detail.OrderId}
                          onChange={(e) => updateNewData(e, "OrderId")}
                      />   
                    </TableCell> 
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={detail.ProdId}
                          onChange={(e) => updateNewData(e, "ProdId")}
                      />                      
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={detail.Qty}
                          onChange={(e) => updateNewData(e, "Qty")}
                      />   
                    </TableCell> 
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={detail.Discount}
                          onChange={(e) => updateNewData(e, "Discount")}
                      />   
                    </TableCell>
                    <TableCell>
                      <button className="btn green-btn" onClick={() => saveBtn()}>
                        Save
                      </button>
                      <button
                        className="btn default-btn"
                        onClick={() => cancelEdit(detail.seq,"orderdetail")}
                      >
                        Cancel
                      </button>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    hover
                    key={detail.seq}
                    selected={selectedOrderIds.indexOf(detail.seq) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrderIds.indexOf(detail.seq) !== -1}
                        onChange={(event) => handleSelectOne(event, detail.seq)}
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
                      {detail.Qty}
                    </TableCell>
                    <TableCell>
                      {detail.Discount}
                    </TableCell>
                    <TableCell>
                      <button
                      className="btn default-btn"
                      onClick={() => enableEdit(detail.seq,detail.OrderId,detail.ProdId, detail.Qty, detail.Discount)}
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
        count={details.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DetailResults.propTypes = {
  details: PropTypes.array.isRequired
};

export default DetailResults;
