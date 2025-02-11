import { Button} from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface StyledButtonProps {
    title: string;
    onClick: () => void;
    color?: string;
    textColor?: string;
    loading?: boolean;
}

export const StyledButton: FC<StyledButtonProps> = memo(({ title, onClick, color, textColor, loading = false }) => {
  return (
    <Button variant="contained" loading={loading} sx={[styles.button, { backgroundColor: color, color: textColor}]} size="large" onClick={onClick}>{title}</Button>
  );
});