import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const prompt = `
    You are an expert senior software engineer and a world-class code reviewer.
    Your task is to provide a comprehensive and constructive review of the following code snippet.

    Language: ${language}

    Code to review:
    \`\`\`${language}
    ${code}
    \`\`\`

    Please provide your feedback in the following structured format using Markdown:

    ### Overall Assessment
    A brief, high-level summary of the code's quality.

    ### 1. Bugs and Logic Errors
    Identify any potential bugs, logic errors, or edge cases that might have been missed. Provide corrected code snippets where applicable.

    ### 2. Performance
    Suggest optimizations for any potential performance bottlenecks or inefficient code.

    ### 3. Best Practices & Readability
    Recommend improvements for code style, clarity, maintainability, and adherence to modern best practices and conventions for the given language.

    ### 4. Security
    Point out any potential security vulnerabilities (e.g., XSS, SQL injection, etc.) and suggest ways to mitigate them.

    If you find no issues in a category, state that clearly. Be professional, clear, and helpful in your feedback.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The request to the Gemini API failed. Please ensure your API key is configured correctly.");
  }
};