import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { themeStyle } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${themeStyle.grayColor}`,
    padding: '16px',
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: '8px',
    marginBottom: '8px',
    '& > span': {
      marginLeft: '8px',
      marginRight: '8px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '4px 10px',
    },
  },
}));

function FilterByPrice({ onChange }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">{t('Choose price range')}</Typography>

      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} />
      </Box>

      <Button variant="outlined" size="small" color="primary">
        {t('APPLY')}
      </Button>
    </Box>
  );
}

export default FilterByPrice;
