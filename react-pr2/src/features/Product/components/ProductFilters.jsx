import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
import ProductSkeletonCategory from './ProductSkeletonCategory';

function ProductFilters(Props) {
  const isLoading = useSelector((state) => state.products.isLoading);

  return (
    <Box>
      {isLoading ? <ProductSkeletonCategory length={6} /> : <FilterByCategory />}
      <FilterByPrice />
      <FilterByService />
    </Box>
  );
}

export default ProductFilters;
