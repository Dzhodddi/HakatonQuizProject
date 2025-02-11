import { Checkbox, InputAdornment, TextField } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';

export interface QuestionOptionTextFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSelected?: boolean;
    setIsSelected?: () => void;
    placeholder?: string;
    canEdit?: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
}

export const QuestionOptionTextField: FC<QuestionOptionTextFieldProps> = memo(({ value, onChange, isSelected, setIsSelected = ()=>{}, placeholder, canEdit= true, isCorrect = false, isWrong = false}) => {
    const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 20) {
            return;
        }
        onChange(event);
    };

    const getStyles = () => {
        if (isCorrect) {
            return styles.correctTextField;
        }

        if (isWrong) {
            return styles.wrongTextField;
        }
        
        if (canEdit) {
            if (value === "") {
                return styles.emptyTextField;
            }
            return styles.textField;
        }

        if (isSelected) {
            return styles.textField;
        }

        return styles.emptyTextField;
    };

  return (
    <TextField
        placeholder={placeholder}
        sx={getStyles()}
        value={value}
        onChange={onTextFieldChange}
        id="input-with-icon-textfield"
        label=""
        disabled={!canEdit}
        slotProps={{
        input: {
            startAdornment: (
            <InputAdornment position="start">
                <Checkbox sx={styles.checkbox} checked={isSelected} onChange={(event)=> setIsSelected()} disabled={value===""}/>
            </InputAdornment>
            ),
        },
        }}
        variant="outlined"
  />
  );
});