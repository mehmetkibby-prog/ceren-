export type Grade = 9 | 10 | 11 | 12;
export type Difficulty = 'Kolay' | 'Orta' | 'Zor' | 'Karma';
export type ActualDifficulty = Exclude<Difficulty, 'Karma'>;

export type Question = {
  id: string;
  grade: Grade;
  topic: string;
  difficulty: ActualDifficulty;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceNote: string;
};

export type GenerateArgs = { grade: Grade; topic: string; count: number; difficulty: Difficulty };

export type WrongRecord = Question & { wrongCount: number; lastWrongAt: number };
export type TestHistory = { id: string; grade: Grade; topic: string; difficulty: Difficulty; count: number; correct: number; date: number };
