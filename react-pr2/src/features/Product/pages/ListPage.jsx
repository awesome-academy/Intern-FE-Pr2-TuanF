import { Box, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI, setFilters } from '../../../store/Slice/productSlice';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductPagination from '../components/ProductPagination';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSoft from '../components/ProductSoft';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { product, filters, isLoading } = useSelector((state) => state.products);
  const { data = [], pagination } = product;

  useEffect(() => {
    dispatch(productAPI(filters));
  }, [filters, dispatch]);

  const handleSoftChange = (newSortValue) => {
    dispatch(
      setFilters({
        ...filters,
        _sort: newSortValue,
      })
    );
  };

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
              <ProductSoft currentSoft={filters._sort} onChange={handleSoftChange} />
              <FilterViewer />
              {isLoading ? <ProductSkeletonList length={12} /> : <ProductList data={data} />}
              <Box className={classes.pagination}>
                <ProductPagination pagination={pagination} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
