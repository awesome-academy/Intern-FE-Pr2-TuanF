import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI } from '../../../store/Slice/productSlice';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSoft from '../components/ProductSoft';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { product, filters } = useSelector((state) => state.products);
  const { data = [], pagination } = product;

  useEffect(() => {
    dispatch(productAPI(filters));
  }, [filters, dispatch]);

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSoft />
              <FilterViewer />
              <ProductList data={data} />
              <Box className={classes.pagination}>
                <Pagination></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
