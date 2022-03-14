import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../constants';

export const thumbnailURL = (thumbnail) => {
  return thumbnail ? `${STATIC_HOST}${thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
};

export const promotion = (promotionPercent) => {
  return promotionPercent > 0 ? `-${promotionPercent}%` : '';
};

export const formatPrice = (num) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(num);
};

export const slowLoading = async (delay = 1000) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
};

export const themeStyle = {
  grayColor: '#ddd',
  blueColor: '#1976d2',
};
