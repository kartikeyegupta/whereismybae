import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_SECRET
});

export async function POST(request: Request) {
  try {
    const { gender, answers } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a witty dating coach analyzing the user responses to seven questions. Based on those answers, create up to three short red flags that are each 1. Creative, funny, and relatable to a college audience 2. Derived from more than one of the user responses so they are personalized 3. General statements about the users love life, rather than direct references to specific questions or answers 4. Present these red flags at the end of your response. They should be concise one to two sentences each and not listed strictly question by question Present these red flags at the end of your response. They should be concise one to two sentences each and not listed strictly question by question. Output the red flags as Title: description. Make the title a short phrase applying to the user(ex. The Ghoster) and the description a short sentence.'
        },
        {
          role: 'user',
          content: `Gender: ${gender}\nAnswers: ${answers.join('\n')}`
        }
      ],
      temperature: 0.8,
    });

    console.log(response.choices[0].message.content);
    return NextResponse.json({ analysis: response.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 