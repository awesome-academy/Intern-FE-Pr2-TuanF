import { Box, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { productAPI } from '../../../store/Slice/productSlice';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductPagination from '../components/ProductPagination';
import ProductSkeletonByFilters from '../components/Filters/ProductSkeletonByFilters';
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

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { data = [], pagination } = product;

  useEffect(() => {
    dispatch(productAPI(queryParams));
  }, [queryParams, dispatch]);

  const handlePageChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSoftChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {isLoading ? (
                <>
                  <ProductSkeletonByFilters length={0} />
                  <ProductSkeletonByFilters length={0} width="100%" />
                  <ProductSkeletonList length={12} />
                </>
              ) : (
                <>
                  <ProductSoft currentSoft={queryParams._sort} onChange={handleSoftChange} />
                  <FilterViewer filters={queryParams} onChange={setNewFilters} />
                  <ProductList data={data} />
                </>
              )}
              <Box className={classes.pagination}>
                <ProductPagination pagination={pagination} onChange={handlePageChange} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
