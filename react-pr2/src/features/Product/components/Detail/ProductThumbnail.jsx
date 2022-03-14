import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/material';
import { thumbnailURL } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  smallImage: {
    paddingTop: '12px',
    borderRadius: '4px',
  },
  active: {
    borderColor: blue[700],
  },
  enlargedImage: {
    position: 'relative',
    zIndex: 100,
  },
}));

function ProductThumbnail({ product = {} }) {
  const { thumbnail, name } = product;
  const classes = useStyles();

  const handleClickImg = (e) => {
    const elementImg = e.target;
    if (elementImg.classList.contains('active')) {
      elementImg.classList.remove('active');
    } else {
      elementImg.classList.add('active');
    }
  };

  return (
    <Box>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: `${name}`,
            isFluidWidth: true,
            src: `${thumbnailURL(thumbnail)}`,
          },
          largeImage: {
            src: `${thumbnailURL(thumbnail)}`,
            width: 1200,
            height: 1800,
          },
        }}
        enlargedImageClassName={classes.enlargedImage}
      />
      <Box className={classes.smallImage && classes.active} onClick={handleClickImg}>
        <img src={thumbnailURL(thumbnail)} alt={name} width="20%" />
      </Box>
    </Box>
  );
}

export default ProductThumbnail;
