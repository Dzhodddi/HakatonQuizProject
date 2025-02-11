import { FC, memo } from 'react';

import { CustomBox } from 'src/UI/CustomBox';
import { CustomTextField } from 'src/UI/CustomTextField';
import { StyledButton } from 'src/UI/StyledButton';
import { QuestionOptionTextField } from 'src/components/QuestionOptionTextField';

export interface AddQuestionCardProps {
    title: string;
    onTitleChange: (title: string) => void;
    options: string[];
    onOptionsChange: (options: string[]) => void;
    correctOption: number;
    setCurrentCorrectOption: (index: number) => void;
    onDelete: () => void;
    canBeDeleted?: boolean;
}

export const AddQuestionCard: FC<AddQuestionCardProps> = memo(({ title, onTitleChange, options, onOptionsChange, correctOption, setCurrentCorrectOption, onDelete, canBeDeleted}) => {
    const onTitleChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(event.target.value);
    };

  return (
        <CustomBox style={{ backgroundColor: "mainPalette.lightBlue", gap: 2}}>
            <CustomTextField label="Question" value={title} onChange={onTitleChangeLocal} maxLength={50} />

            <QuestionOptionTextField value={options[0]} onChange={(event) => onOptionsChange([event.target.value, options[1], options[2], options[3]])} placeholder="Option 1" isSelected={correctOption === 0} setIsSelected={()=> setCurrentCorrectOption(0)}/>

            <QuestionOptionTextField value={options[1]} onChange={(event) => onOptionsChange([options[0], event.target.value, options[2], options[3]])} placeholder="Option 2" isSelected={correctOption === 1} setIsSelected={()=> setCurrentCorrectOption(1)}/>

            <QuestionOptionTextField value={options[2]} onChange={(event) => onOptionsChange([options[0], options[1], event.target.value, options[3]])} placeholder="Option 3" isSelected={correctOption === 2} setIsSelected={()=> setCurrentCorrectOption(2)}/>

            <QuestionOptionTextField value={options[3]} onChange={(event) => onOptionsChange([options[0], options[1], options[2], event.target.value])} placeholder="Option 4" isSelected={correctOption === 3} setIsSelected={()=> setCurrentCorrectOption(3)}/>

            {canBeDeleted && (
                <StyledButton title="Delete" onClick={onDelete} color="mainPalette.red" />
            )}
        </CustomBox>
  );
});