import { Button} from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface StyledButtonProps {
    title: string;
    onClick: () => void;
    color?: string;
    textColor?: string;
}

export const StyledButton: FC<StyledButtonProps> = memo(({ title, onClick, color, textColor }) => {
  return (
    <Button variant="contained" sx={[styles.button, { backgroundColor: color, color: textColor}]} size="large" onClick={onClick}>{title}</Button>
  );
});