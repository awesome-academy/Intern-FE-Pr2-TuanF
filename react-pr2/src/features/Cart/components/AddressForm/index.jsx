import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputField from '../..//../../components/form-controls/InputField';
import { useHistory } from 'react-router-dom';

function AddressForm(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const { onSubmit, activeStep, steps } = props;
  const schema = yup
    .object()
    .shape({
      fullname: yup
        .string()
        .required('Please enter fullname')
        .min(2, 'Mininum 2 characters')
        .max(15, 'Maximum 15 characters'),
      phone: yup
        .string()
        .required('Please enter number phone')
        .min(10, 'Please enter valid phone number')
        .max(10, 'Please enter valid phone number')
        .typeError('Please enter number phone'),
      district: yup.string().required('Please enter district').min(3, 'district is too short!'),
      ward: yup.string().required('Please enter ward/commune').min(2, 'ward is too short!'),
      address: yup.string().required('Please enter address').min(3, 'address is too short!'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullname: '',
      phone: '',
      district: '',
      ward: '',
      address: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
  };

  const handleBackCart = () => {
    history.push('/cart');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {t('Shipping address')}
      <InputField name="fullname" label={`${t('Fullname')}`} form={form} />
      <InputField name="phone" label={`${t('Number Phone')}`} form={form} />
      <InputField name="district" label={`${t('District')}`} form={form} />
      <InputField name="ward" label={`${t('Ward')}`} form={form} />
      <InputField name="address" label={`${t('Address')}`} form={form} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleBackCart}>
          {t('BACK')}
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
          {activeStep === steps.length - 1 ? `${t('Place order')}` : `${t('NEXT')}`}
        </Button>
      </Box>
    </form>
  );
}

export default AddressForm;
