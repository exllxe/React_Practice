import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
//import moment from 'moment';
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


const ProductListResults = ({products,handleProductInsert,keyWord}) => {
  const navigate = useNavigate();
  //const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newData, setNewData] = useState({});
  const {
    cancelEdit,
    updateProduct,
    editMode,
    deleteProduct,
  } = useContext(AppContext);
  /*
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
  */
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
    updateProduct(newData,keyWord);
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
  return (
    <Card >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={() => (handleProductInsert())}>
            新增
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
                <TableCell>
                  修改        
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page*limit, page*limit+limit).map((product) => {
                return product.Edit === true ?(
                  <TableRow
                    hover
                    key={product.ProdID}
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
                          {product.ProdID}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField     
                        type="text"
                        defaultValue={product.ProdName} 
                        onChange={(e) => updateNewData(e, "ProdName")}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField   
                        type="text"  
                        defaultValue={product.UnitPrice}
                        onChange={(e) => updateNewData(e, "UnitPrice")}
                      />                    
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text" 
                        defaultValue={product.Cost}
                        onChange={(e) => updateNewData(e, "Cost")}
                      />     
                    </TableCell>  
                    <TableCell>
                      <Button color="primary" variant="contained" onClick={() => saveBtn()}>
                        儲存
                      </Button>
                      <Button color="secondary" variant="contained" onClick={() => cancelEdit(product.ProdID,"product")}>
                        取消
                      </Button>
                    </TableCell>
                  </TableRow>
                ):(
                  <TableRow
                    hover
                    key={product.ProdID}
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
                          {product.ProdID}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {product.ProdName}
                    </TableCell>
                    <TableCell>
                      {product.UnitPrice}
                    </TableCell>
                    <TableCell>
                      {product.Cost}
                    </TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" startIcon={<EditIcon/>}
                        onClick={() => enableEdit(product.ProdID, product.ProdName, product.UnitPrice,product.Cost)}
                      >
                        編輯
                      </Button>
                      <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteConfirm(product.ProdID)}>
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
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductListResults.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListResults;