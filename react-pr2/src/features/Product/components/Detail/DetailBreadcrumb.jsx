import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

export default function DetailBreadcrumb({ product = {} }) {
  const { category = '' } = product;
  const { name, id } = category;
  const history = useHistory();
  const { t } = useTranslation();

  function handleClickHome(event) {
    event.preventDefault();
    history.push('/');
  }

  function handleClickName(event) {
    event.preventDefault();
    const filters = {
      _limit: 12,
      _page: 1,
      _sort: 'salePrice:ASC',
      'category.id': id,
      'category.name': name,
    };
    const params = queryString.stringify(filters);
    history.push(`/?${params}`);
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClickHome}>
      {t('Home')}
    </Link>,
    <Link underline="hover" key="3" color="inherit" href="" onClick={handleClickName}>
      {name}
    </Link>,
    <Typography key="4" color="text.primary">
      {product['name']}
    </Typography>,
  ];

  return (
    <Stack p={1.5}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
