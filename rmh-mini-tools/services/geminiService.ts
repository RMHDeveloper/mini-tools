
const PROXY_URL = "/api/proxy";

async function generateContent(body: unknown) {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini request failed (${res.status}). ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }
  return text;
}

export const findGstRate = async (productName: string) => {
  const text = await generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following product or service and determine its most common GST rate in India: "${productName}".
               IMPORTANT: According to the new tax slabs, you MUST ONLY choose from the following rates: 0, 5, 18, or 40.
               Do not provide rates like 12% or 28%. Map the product to the nearest appropriate new slab.
               Provide the response in JSON format including the category name and the percentage rate.`,
    generationConfig: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: "OBJECT",
        properties: {
          category: { type: "STRING" },
          rate: { type: "NUMBER" },
          justification: { type: "STRING" },
          verificationNote: { type: "STRING" }
        },
        required: ["category", "rate", "justification", "verificationNote"]
      }
    }
  });
  return JSON.parse(text);
};

export const findHsnCode = async (productName: string, category?: string) => {
  const text = await generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify a list of likely HSN codes and sub-codes for "${productName}" ${category ? `in category "${category}"` : ''} for taxation in India.
               IMPORTANT: According to the new tax slabs, for every item found, you MUST ONLY use one of the following GST rates: 0, 5, 18, or 40.
               Include details like GST Rate, CESS, Effective Date, and Rate Revision.
               Provide the response in JSON format as an array of items.`,
    generationConfig: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: "OBJECT",
        properties: {
          items: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                hsnCode: { type: "STRING", description: '4, 6, or 8 digit HSN code' },
                description: { type: "STRING" },
                rate: { type: "NUMBER", description: 'Percentage rate, must be 0, 5, 18, or 40' },
                cess: { type: "NUMBER", description: 'CESS percentage, e.g. 0' },
                effectiveDate: { type: "STRING", description: 'DD/MM/YYYY format' },
                rateRevision: { type: "STRING", description: 'Summary of the rate, e.g. 18%' }
              },
              required: ["hsnCode", "description", "rate", "cess", "effectiveDate", "rateRevision"]
            }
          },
          disclaimer: { type: "STRING" }
        },
        required: ["items", "disclaimer"]
      }
    }
  });
  return JSON.parse(text);
};
