import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice, thumbnailURL } from '../../utils/utils';
import CartBreadcrumb from './components/CartBreadcrumb';
import CartEmpty from './components/CartEmpty';
import EnhancedTableHead from './components/EnhancedTableHead';
import EnhancedTableToolbar from './components/EnhancedTableToolbar';
import { cartItemCountSelector, cartItemSelector } from './selectors';
import Quantity from './components/Quantity';
import { removeFromCart } from '../../store/Slice/cartSlice';
import { useTranslation } from 'react-i18next';
import './index.scss';

const useStyles = makeStyles((theme) => ({
  root: {},
  salePrice: {
    marginRight: '8px',
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: '8px',
    fontSize: '12px',
    textDecoration: 'line-through',
  },
  thumbnail: {
    display: 'flex',
    alignItems: 'center',
  },
  totalItem: {
    color: red[400],
  },
}));

export default function CartFeature() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();

  const cartItemsCount = useSelector(cartItemCountSelector);
  const cartItems = useSelector(cartItemSelector);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cartItems.map(({ product }) => product.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = (event, id) => {
    dispatch(removeFromCart(id));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Container>
        <CartBreadcrumb />
        <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
          {cartItemsCount > 0 ? (
            <>
              <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={cartItems.length}
                    />
                    <TableBody>
                      {cartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const { product, quantity } = row;
                        const { salePrice, originalPrice, promotionPercent, name, thumbnail, id } = product;
                        const isItemSelected = isSelected(id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                onClick={(event) => handleClick(event, id)}
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              <Box className={classes.thumbnail}>
                                <img src={thumbnailURL(thumbnail)} alt={name} width="80px" />
                                <Box ml={2}>{name}</Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              <Box>
                                <Box component="span" className={classes.salePrice}>
                                  {formatPrice(salePrice)}
                                </Box>
                                {promotionPercent > 0 && (
                                  <Box component="span" className={classes.originalPrice}>
                                    {formatPrice(originalPrice)}
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Quantity id={id} quantity={quantity} />
                            </TableCell>
                            <TableCell align="left">
                              <Box component="span" className={classes.totalItem}>
                                {formatPrice(salePrice * quantity)}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title={t('Delete')}>
                                <IconButton onClick={(event) => handleDeleteItem(event, id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={cartItems.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </>
          ) : (
            <CartEmpty />
          )}
        </Paper>
      </Container>
    </Box>
  );
}
