import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for a Job Portal application called Next Hire. 
          You help users (job seekers and employers) navigate the site, understand features, and provide career advice.
          
          Key features of the site:
          - Find Jobs: Browse and filter jobs using the sidebar (salary, type, etc.).
          - Companies: Explore top companies.
          - Dashboard: Employers can post jobs; users can view applied jobs.
          - Secure Environment: We prioritize user data security.
          
          Keep your responses concise, professional, and friendly.`,
                },
                ...messages,
            ],
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("OpenAI API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request", details: error.message },
            { status: 500 }
        );
    }
}
