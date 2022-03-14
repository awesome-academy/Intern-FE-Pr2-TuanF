import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { productApiId } from '../../../store/Slice/productDetailSlice';
import AddToCartForm from '../components/Detail/AddToCartForm';
import DetailBreadcrumb from '../components/Detail/DetailBreadcrumb';
import ProductThumbnail from '../components/Detail/ProductThumbnail';
import ProductSkeletonByFilters from '../components/Filters/ProductSkeletonByFilters';
import ProductDetail from '../components/ProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: '12px',
    borderRight: `1px solid ${grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: '12px',
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { productId },
  } = useRouteMatch();

  const { productDetail, isLoading } = useSelector((state) => state.productDetail);
  const product = productDetail[productId];

  useEffect(() => {
    if (!product) {
      dispatch(productApiId(productId));
    }
  }, [product, productId, dispatch]);

  return (
    <Box className={classes.root}>
      <Container>
        {isLoading ? <ProductSkeletonByFilters length={1} /> : <DetailBreadcrumb product={product} />}
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              {isLoading ? (
                <Box className={classes.loading}>
                  <LinearProgress />
                </Box>
              ) : (
                <ProductThumbnail product={product} />
              )}
            </Grid>
            <Grid item className={classes.right}>
              <ProductDetail {...product} />
              <AddToCartForm />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
