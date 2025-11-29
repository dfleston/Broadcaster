import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SocialContent } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Agent 1: The Storyteller
export const generateStoryFromSeed = async (seed: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a creative master storyteller. 
      
      Task: Take the following "seed idea" and expand it into a compelling, short narrative story (approx 200-300 words). 
      Style: Engaging, descriptive, and emotionally resonant.
      
      Seed Idea: "${seed}"`,
      config: {
        temperature: 0.8,
        systemInstruction: "You are an expert creative writing agent.",
      }
    });

    return response.text || "Failed to generate story.";
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Failed to generate story. Please try again.");
  }
};

// Agent 2: The Social Media Strategist
export const repurposeForSocial = async (story: string): Promise<SocialContent> => {
  if (!apiKey) throw new Error("API Key is missing");

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      twitter: {
        type: Type.STRING,
        description: "A punchy, thread-starter style tweet (under 280 chars) hooking the reader.",
      },
      instagram: {
        type: Type.STRING,
        description: "An engaging caption with emojis and 3-5 relevant hashtags.",
      },
      youtube: {
        type: Type.STRING,
        description: "A short video script concept or description including a catchy title and hook.",
      },
    },
    required: ["twitter", "instagram", "youtube"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a viral social media manager agent.
      
      Task: Repurpose the following story into specific content formats for X (Twitter), Instagram, and YouTube.
      
      Source Story:
      "${story}"
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from social agent");

    return JSON.parse(jsonText) as SocialContent;
  } catch (error) {
    console.error("Error generating social content:", error);
    throw new Error("Failed to generate social media content.");
  }
};

// Agent 3: The Visual Illustrator
export const generateVisuals = async (story: string): Promise<string[]> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Step 1: Generate prompts for the comic panels
  let prompts: string[] = [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert comic book artist and director.
      
      Task: Analyze the provided story and create 3 distinct, sequential visual descriptions (prompts) for a 3-panel comic strip that summarizes the narrative.
      
      Requirements:
      - Return ONLY a JSON array of strings.
      - Each string should be a detailed image prompt.
      - Style: Digital comic book style, vibrant colors, expressive characters, consistent lighting.
      - Format: ["Panel 1 description...", "Panel 2 description...", "Panel 3 description..."]
      
      Story: "${story}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonText = response.text;
    if (jsonText) {
      prompts = JSON.parse(jsonText);
    }
  } catch (error) {
    console.error("Error generating prompts:", error);
    throw new Error("Failed to create visual prompts.");
  }

  if (prompts.length === 0) throw new Error("No prompts generated");

  // Step 2: Generate images from prompts (Parallel execution)
  try {
    const imagePromises = prompts.slice(0, 3).map(async (prompt) => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      // Extract image data
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return ""; // Fallback
    });

    const images = await Promise.all(imagePromises);
    return images.filter(img => img !== "");
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error("Failed to generate visual assets.");
  }
};