import { Box } from '@mui/system';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

function ProductFilters(Props) {
  return (
    <Box>
      <FilterByCategory />
      <FilterByPrice />
      <FilterByService />
    </Box>
  );
}

export default ProductFilters;
