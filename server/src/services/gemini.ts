import { ENV } from '../config/env.js';

export async function callGeminiAPI(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = ENV.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Model fallbacks supported on Google AI v1beta
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp'];

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload: any = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini model ${model} HTTP Error (${response.status}): ${errorText}`);
        continue; // try next model fallback
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (text && text.trim()) {
        return text.trim();
      }
    } catch (error: any) {
      console.warn(`Gemini call to ${model} failed, trying next fallback...`);
    }
  }

  throw new Error('All Gemini model fallbacks failed');
}

export function parseJSONFromText<T>(text: string, fallback: T): T {
  try {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text];
    const cleanStr = (jsonMatch[1] || text).trim();
    return JSON.parse(cleanStr) as T;
  } catch (e) {
    console.warn('Failed to parse JSON from AI response, using fallback');
    return fallback;
  }
}
