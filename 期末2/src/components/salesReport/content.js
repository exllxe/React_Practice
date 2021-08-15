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

//import {useContext } from 'react';
//import  {AppContext}  from '../../Context';


const Content = ({salesData}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>客戶名稱</TableCell>
                <TableCell>客戶代號</TableCell>
                <TableCell>總銷售金額</TableCell>
                <TableCell>總利潤</TableCell>             
              </TableRow>
            </TableHead>
            <TableBody>
                {salesData.slice(page*limit, page*limit+limit).map((row,index) => (
                    <TableRow
                        hover
                        key={index}
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
                                {row.CustName}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>{row.CustId}</TableCell>
                        <TableCell>{row.sales_amount}</TableCell>
                        <TableCell>{row.profit}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination

        component="div"
        count={salesData.length}
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
Content.propTypes = {
  products: PropTypes.array.isRequired
};*/

export default Content;