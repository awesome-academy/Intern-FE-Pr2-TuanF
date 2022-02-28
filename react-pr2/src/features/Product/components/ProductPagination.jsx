import { Pagination } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/Slice/productSlice';

function ProductPagination({ pagination = { page: 1, limit: 12, total: 12 } }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const handlePageChange = (e, page) => {
    const action = setFilters({
      ...filters,
      _page: page,
    });

    dispatch(action);
  };

  return (
    <Pagination
      count={Math.ceil(pagination.total / pagination.limit)}
      page={pagination.page}
      color="primary"
      onChange={handlePageChange}
    ></Pagination>
  );
}

export default ProductPagination;
