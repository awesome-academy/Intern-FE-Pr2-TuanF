import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { categoryAPI } from '../../../../store/Slice/categorySlice';
import { themeStyle } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px',
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: '8px',
      transition: 'all 0.25s',
      '&:hover': {
        color: themeStyle.blueColor,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);
  const categories = category.map(({ id, name }) => ({
    id,
    name,
  }));

  useEffect(() => {
    dispatch(categoryAPI());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">{t('Product category')}</Typography>

      <ul className={classes.menu}>
        {categories.map((category) => (
          <li key={category.id}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
