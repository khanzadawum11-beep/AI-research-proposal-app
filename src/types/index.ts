export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Proposal {
  id: string;
  userId: string;
  title: string;
  topic: string;
  researchArea: string;
  academicLevel: string;
  objectives: string[];
  problemStatement: string;
  hypothesis: string;
  researchQuestions: string[];
  methodology: string;
  expectedOutcomes: string[];
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}