import { ENV } from '../config/env.js';

export async function callGeminiAPI(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = ENV.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Use Gemini 2.5 Flash API endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload: any = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Gemini API HTTP Error (${response.status}): ${errorText}`);
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    return text.trim();
  } catch (error: any) {
    console.error('Gemini API call failed:', error?.message || error);
    throw error;
  }
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
