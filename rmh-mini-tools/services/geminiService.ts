
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const findGstRate = async (productName: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following product or service and determine its most common GST rate in India: "${productName}". 
               IMPORTANT: According to the new tax slabs, you MUST ONLY choose from the following rates: 0, 5, 18, or 40. 
               Do not provide rates like 12% or 28%. Map the product to the nearest appropriate new slab.
               Provide the response in JSON format including the category name and the percentage rate.`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          rate: { type: Type.NUMBER },
          justification: { type: Type.STRING },
          verificationNote: { type: Type.STRING }
        },
        required: ["category", "rate", "justification", "verificationNote"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const findHsnCode = async (productName: string, category?: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify a list of likely HSN codes and sub-codes for "${productName}" ${category ? `in category "${category}"` : ''} for taxation in India. 
               IMPORTANT: According to the new tax slabs, for every item found, you MUST ONLY use one of the following GST rates: 0, 5, 18, or 40.
               Include details like GST Rate, CESS, Effective Date, and Rate Revision.
               Provide the response in JSON format as an array of items.`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hsnCode: { type: Type.STRING, description: '4, 6, or 8 digit HSN code' },
                description: { type: Type.STRING },
                rate: { type: Type.NUMBER, description: 'Percentage rate, must be 0, 5, 18, or 40' },
                cess: { type: Type.NUMBER, description: 'CESS percentage, e.g. 0' },
                effectiveDate: { type: Type.STRING, description: 'DD/MM/YYYY format' },
                rateRevision: { type: Type.STRING, description: 'Summary of the rate, e.g. 18%' }
              },
              required: ["hsnCode", "description", "rate", "cess", "effectiveDate", "rateRevision"]
            }
          },
          disclaimer: { type: Type.STRING }
        },
        required: ["items", "disclaimer"]
      }
    }
  });
  return JSON.parse(response.text);
};
