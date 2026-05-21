import { inngest } from "./client";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: { event: "test/hello.world" } },
  async ({ event }) => {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Next.js develoer. You write readble, maintainable Next.js and React code snippets.",
        },
        {
          role: "user",
          content: `generate the code for the following application: ${event.data.value}`,
        },
      ],
    });

    return {
      output: response.choices[0].message.content,
    };
  }
);