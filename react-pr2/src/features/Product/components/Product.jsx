import { Box, Typography } from '@mui/material';
import React from 'react';
import { promotion, thumbnailURL, formatPrice } from '../../../utils/utils';

function Product({ thumbnail, name, salePrice, promotionPercent }) {
  return (
    <Box padding={1}>
      <Box padding={1} minHeight={220}>
        <img src={thumbnailURL(thumbnail)} alt={name} width="100%" />
      </Box>
      <Typography variant="body2">{name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatPrice(salePrice)}
        </Box>
        {promotion(promotionPercent)}
      </Typography>
    </Box>
  );
}

export default Product;
