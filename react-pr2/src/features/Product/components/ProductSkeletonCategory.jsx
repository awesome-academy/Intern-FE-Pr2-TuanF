import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function ProductSkeletonCategory({ length }) {
  return (
    <Box>
      <Grid container padding={2}>
        <Grid item mb={1} width="100%">
          <Skeleton width="70%" />
        </Grid>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} width="100%" mb={0.5}>
            <Box>
              <Skeleton width="50%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonCategory;
