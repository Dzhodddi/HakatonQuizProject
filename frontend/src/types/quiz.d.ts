import { UserType } from "./user";

export type QuizType = {
    id: number;
    title: string;
    description: string;
    author: UserType;
    questions: QuestionType[];
};

export type QuestionType = {
    title: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_option: number;
};