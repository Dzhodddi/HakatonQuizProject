import { Box, SxProps, Theme } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface CustomBoxProps {
    children?: React.ReactNode;
    style?: SxProps<Theme>;
}

export const CustomBox: FC<CustomBoxProps> = memo(({ children, style = {} }) => {
  return (
    <Box sx={{...styles.root, ...style}}>{children}</Box>
  );
});