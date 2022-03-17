import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMultiple } from '../../../store/Slice/cartSlice';
import { useTranslation } from 'react-i18next';

function EnhancedTableToolbar({ numSelected, selected }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteAll = (event, selected) => {
    selected.forEach((item) => {
      dispatch(removeMultiple(item));
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} {t('Selected')}
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {t('CART')}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title={t('Delete')}>
          <IconButton onClick={(event) => handleDeleteAll(event, selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('Filter list')}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
