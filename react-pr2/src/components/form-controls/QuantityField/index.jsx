import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <>
          <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
            <Typography mb={1}>{label}</Typography>
            <Box className={classes.box}>
              <Button>
                <RemoveCircleOutline
                  onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}
                />
              </Button>
              <OutlinedInput
                id={name}
                error={hasError}
                type="number"
                value={value}
                disabled={disabled}
                onBlur={onBlur}
                onChange={onChange}
              />
              <Button>
                <AddCircleOutline
                  onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
                />
              </Button>
            </Box>
          </FormControl>
          <FormHelperText error={hasError}>{errors[name]?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default QuantityField;
