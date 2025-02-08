import { TextField } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isHalf?: boolean;
    isMultiline?: boolean;
}

export const CustomTextField: FC<CustomTextFieldProps> = memo(({ label, value, onChange, isMultiline, isHalf }) => {
  return (
    <TextField multiline={isMultiline} label={label} maxRows={3} sx={[styles.textField, isHalf ? styles.halfTextField : {}]} value={value} onChange={onChange} />
  );
});