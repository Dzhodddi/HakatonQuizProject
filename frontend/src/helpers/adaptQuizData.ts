import { QuestionApiType, QuestionType, QuizApiType, QuizType } from "src/types/quiz";

export const componentToApiQuiz = (quiz: QuizType) => {
    return {
        author_id: quiz.authorId,
        title: quiz.title,
        description: quiz.description,
        slides: quiz.questions.map((question, index) => componentToApiQuestion(question, index)),
    } as QuizApiType;
};

export const componentToApiQuestion = (question: QuestionType, index: number) => {
    return {
        id: Number(index) + 1,
        answer_id: Number(question.correct_option) + 1,
        answer1: question.option1,
        answer2: question.option2,
        answer3: question.option3,
        answer4: question.option4,
        question: question.title,
    } as QuestionApiType;
};

export const apiToComponentQuiz = (quiz: QuizApiType) => {
    return {
        id: 0,
        title: quiz.title,
        description: quiz.description,
        authorId: quiz.author_id,
        questions: quiz.slides.map(apiToComponentQuestion),
    } as QuizType;
};

export const apiToComponentQuestion = (question: QuestionApiType) => {
    return {
        title: question.question,
        option1: question.answer1,
        option2: question.answer2,
        option3: question.answer3,
        option4: question.answer4, 
        correct_option: question.answer_id,
    } as QuestionType;
};
