import { QuizType } from "src/types/quiz";
import { UserType } from "src/types/user";

export const dummyUser: UserType = {
    id: "1",
    first_name: "Alice",
    second_name: "Johnson",
    email: "alice.johnson@example.com",
};

export const dummyQuizzes: QuizType[] = [
    {
        id: 1,
        title: "General Knowledge Quiz",
        description: "Test your general knowledge with these questions.",
        author: dummyUser,
        questions: [
            {
                title: "What is the capital of France?",
                option1: "Berlin",
                option2: "Madrid",
                option3: "Paris",
                option4: "Rome",
                correct_option: 3, // Paris
            },
            {
                title: "Which planet is known as the Red Planet?",
                option1: "Earth",
                option2: "Mars",
                option3: "Jupiter",
                option4: "Venus",
                correct_option: 2, // Mars
            },
        ],
    },
    {
        id: 2,
        title: "Science Trivia",
        description: "A quiz to test your science knowledge.",
        author: dummyUser,
        questions: [
            {
                title: "What is the chemical symbol for water?",
                option1: "O2",
                option2: "H2O",
                option3: "CO2",
                option4: "NaCl",
                correct_option: 2, // H2O
            },
            {
                title: "What gas do plants absorb from the atmosphere?",
                option1: "Oxygen",
                option2: "Hydrogen",
                option3: "Carbon Dioxide",
                option4: "Nitrogen",
                correct_option: 3, // Carbon Dioxide
            },
        ],
    },
];

export default dummyQuizzes;
