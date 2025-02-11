import { TextField } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface CustomTextFieldProps {
    label: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isHalf?: boolean;
    isMultiline?: boolean;
    error?: boolean;
    errorText?: string;
    maxLength?: number;
    type?: string;
}

export const CustomTextField: FC<CustomTextFieldProps> = memo(({ label, value, onChange = () => {}, isMultiline, isHalf, error, errorText, maxLength, type }) => {
  const onChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      return;
    }

    onChange(event);
  };

  return (
    <TextField 
    multiline={isMultiline} 
    label={label} 
    type={type}
    maxRows={3}
    error={error} 
    helperText={errorText} 
    sx={[styles.textField, isHalf ? styles.halfTextField : {}]} 
    value={value}
    onChange={onChangeLocal} />
  );
});