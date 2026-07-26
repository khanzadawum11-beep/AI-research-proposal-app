import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ProposalGeneratorParams {
  topic: string;
  researchArea: string;
  academicLevel: string;
}

export const generateProposal = async (params: ProposalGeneratorParams) => {
  const prompt = `You are an academic research assistant. Generate a comprehensive research proposal for the following:

Topic: ${params.topic}
Research Area: ${params.researchArea}
Academic Level: ${params.academicLevel}

Provide the following in JSON format:
{
  "title": "Research title",
  "objectives": ["Objective 1", "Objective 2", "Objective 3"],
  "problemStatement": "Problem statement",
  "hypothesis": "Hypothesis",
  "researchQuestions": ["Question 1", "Question 2"],
  "methodology": "Detailed methodology",
  "expectedOutcomes": ["Outcome 1", "Outcome 2"],
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error('Error generating proposal:', error);
    throw error;
  }
};