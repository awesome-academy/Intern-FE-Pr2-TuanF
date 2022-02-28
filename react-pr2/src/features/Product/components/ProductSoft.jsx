import { Tab, Tabs } from '@mui/material';
import React from 'react';

function ProductSoft({ currentSoft, onChange }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs value={currentSoft} onChange={handleSortChange} aria-label="disabled tabs example">
      <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSoft;
