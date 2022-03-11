import LanguageIcon from '@mui/icons-material/Language';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import SeacrchInput from './SeacrchInput/index';

const useStyles = makeStyles({
  root: {},
  logoIcon: {
    marginRight: '100px',
  },
  header: {
    height: '100px',
  },
  account: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function Header() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = () => {
    if (language === 'en') {
      i18n.changeLanguage('vi');
      setLanguage('vi');
    } else {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.header}>
            <Link to="/">
              <Box className={classes.logoIcon}>
                <img src={logo} alt="logo" width="60px" height="40px" />
              </Box>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <SeacrchInput />
            </Typography>
            <Box className={classes.account}>
              <Button color="inherit" onClick={handleChangeLanguage}>
                {t('en')}
                <LanguageIcon />
              </Button>
              <Button color="inherit">{t('Login')}</Button>
              <Typography>/</Typography>
              <Button color="inherit">{t('Register')}</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
