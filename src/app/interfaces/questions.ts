export interface Questions {
    id: number;
    question: string;
    answer: string;
    option_1: string;
    option_2: string;
    option_3: string;
    guessed: number;
    tries: number;
    points: number;
}
