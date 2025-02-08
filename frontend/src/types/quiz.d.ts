import { UserType } from "./user";

export type QuizType = {
    id: number;
    title: string;
    description: string;
    author: UserType;
    questions: QuestionType[];
};

export type QuestionType = {
    id: number;
    title: string;
    type: "single" | "multiple";
    options: OptionType[];
};

export type OptionType = {
    id: number;
    title: string;
    is_correct: boolean;
};