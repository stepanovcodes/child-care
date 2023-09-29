import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

interface RatingHeartProps {
  value: number;
  userRatingsTotal: number;
}

export default function HeartRating({value, userRatingsTotal}: RatingHeartProps) {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span>{value !== null ? value.toFixed(1) : ''}</span>
      <StyledRating
        name="customized-color"
        defaultValue={0}
        value={value}
        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        readOnly
      />
      <span>{userRatingsTotal !== null ? `(${userRatingsTotal})` : ''}</span>
    </Box>
  );
}