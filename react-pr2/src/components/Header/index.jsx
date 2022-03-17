import LanguageIcon from '@mui/icons-material/Language';
import { AppBar, Box, Button, Container, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/logo.png';
import SeacrchInput from './SeacrchInput/index';
import { cartItemCountSelector } from '../../features/Cart/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import ShowMiniCart from '../../features/Cart/components/showMiniCart';
import { toggleMiniCartClick } from '../../store/Slice/cartSlice';
import './index.scss';

const useStyles = makeStyles({
  root: {},
  logoIcon: {
    marginRight: '90px',
  },
  header: {
    height: '100px',
  },
  account: {
    display: 'flex',
    alignItems: 'center',
  },
  miniCart: {
    position: 'absolute',
    top: '50px',
    right: '9px',
  },
  cart: {
    position: 'relative',
  },
});

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemCountSelector);
  const showMiniCarts = useSelector((item) => item.cart.showMiniCart);
  const history = useHistory();
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

  const handleCartClick = () => {
    history.push('/cart');
    dispatch(toggleMiniCartClick(false));
  };

  const handleCartClose = () => {
    dispatch(toggleMiniCartClick(false));
  };

  const handleLogoClick = () => {
    history.push('/');
    dispatch(toggleMiniCartClick(false));
  };

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.header}>
            <Button onClick={handleLogoClick}>
              <Box className={classes.logoIcon}>
                <img src={logo} alt="logo" width="60px" height="40px" />
              </Box>
            </Button>
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
            <Box className={classes.cart}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItemsCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Box className={classes.miniCart}>{showMiniCarts && <ShowMiniCart onClose={handleCartClose} />}</Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
