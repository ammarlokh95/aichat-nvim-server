import { GoogleGenAI } from "@google/genai";
import { serve } from "bun";
import type { BunRequest } from "bun";

interface PromptBody {
  prompt: string;
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const server = serve({
  port: 8080,
  routes: {
    "/prompt": {
      async POST(req: BunRequest) {
        console.log("Connected");
        const body = await req.json();
        console.log(body);
        const result = await ai.models.generateContent({
          model: "gemini-2.5-pro-exp-03-25",
          contents: (body as PromptBody).prompt,
        });
        return new Response(result.text);
      },
    },
  },
});

console.log(`Server listening on port: 8080`);
