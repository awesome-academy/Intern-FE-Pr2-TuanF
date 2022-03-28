import { Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogin, updateInfoUser } from '../../../store/Slice/userSlice';
import InfomationForm from './InfomationForm';

function ProfileInfomation(props) {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.user.info);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmitForm = async (values) => {
    const newInfo = { ...info, ...values };
    await dispatch(updateInfoUser(newInfo));
    dispatch(getUserLogin(info.id));

    enqueueSnackbar(`${t('Update successfully')}`, { variant: 'success' });
  };

  return (
    <Box>
      <Paper sx={{ padding: '16px' }}>
        <InfomationForm onSubmit={handleSubmitForm} />
      </Paper>
    </Box>
  );
}

export default ProfileInfomation;
