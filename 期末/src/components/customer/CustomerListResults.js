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


const CustomerListResults = ({ customers, ...rest }) => {
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState({});
  const {
    cancelEdit,
    updateProduct,
    editMode,
    deleteProduct,
  } = useContext(AppContext);

  const handleSelectOne = (event,id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);

    let newSelectedCustomerIds = [];
    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);    
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
    
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
    updateProduct(newData);
  };
  const enableEdit = (ProdID, ProdName,UnitPrice,Cost) => {
    setNewData({ ProdID, ProdName,UnitPrice,Cost});
    editMode(ProdID,"product");
  };
  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(id);
    }
  };
  const addProduct = (id) => {
    navigate('/app/addproducts', { replace: true });
  };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Button color="primary" variant="contained" onClick={() => deleteConfirm(selectedCustomerIds)}>
            Delete product
          </Button>
          <Button color="primary" variant="contained" onClick={() => addProduct()}>
            Add product
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    //onChange={handleSelectAll}
                  />
                </TableCell>
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
                <TableCell>
                  修改        
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page*limit, page*limit+limit).map((customer) => {
                return customer.Edit === true ?(
                  <TableRow
                    hover
                    key={customer.ProdID}
                    selected={selectedCustomerIds.indexOf(customer.ProdID) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.ProdID) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.ProdID)}
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
                          {customer.ProdID}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={customer.ProdName}
                        onChange={(e) => updateNewData(e, "ProdName")}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={customer.UnitPrice}
                          onChange={(e) => updateNewData(e, "UnitPrice")}
                      />                      
                    </TableCell>
                    <TableCell>
                      <input
                          type="text"
                          defaultValue={customer.Cost}
                          onChange={(e) => updateNewData(e, "Cost")}
                      />   
                    </TableCell>  
                    <TableCell>
                      <button className="btn green-btn" onClick={() => saveBtn()}>
                        Save
                      </button>
                      <button
                        className="btn default-btn"
                        onClick={() => cancelEdit(customer.ProdID,"product")}
                      >
                        Cancel
                      </button>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    hover
                    key={customer.ProdID}
                    selected={selectedCustomerIds.indexOf(customer.ProdID) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.ProdID) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.ProdID)}
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
                          {customer.ProdID}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.ProdName}
                    </TableCell>
                    <TableCell>
                      {customer.UnitPrice}
                    </TableCell>
                    <TableCell>
                      {customer.Cost}
                    </TableCell>
                    <TableCell>
                      <button
                      className="btn default-btn"
                      onClick={() => enableEdit(customer.ProdID, customer.ProdName, customer.UnitPrice,customer.Cost)}
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
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
