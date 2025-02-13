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
          content: `You are a dating coach analyzing the user responses to seven questions. Based on those answers, create up to three short red flags that are each 1. Creative, funny, and relatable to a college audience 2. Derived from more than one of the user responses so they are personalized 3. General statements about the users love life, rather than direct references to specific questions or answers 4. Present these red flags at the end of your response. They should be concise one to two sentences each and not listed strictly question by question Present these red flags at the end of your response. They should be concise one to two sentences each and not listed strictly question by question. Use college lingo like "rizz","on god","touch grass","ate and left no crumbs","based", "obsession","i\'m feral (girls only for this)","unhinged","down bad","simping" (means to pursue someone and cater to their every whim),"delulu" (meaning delusional, only use this one for girls),"fixated","i can\'t even / i\'m deceased (girls only for this)", "cooked (meaning to be doomed)", "flex (to show off)", "demure (mindful)", "chopped (someone who is conventionally unnattractive, use for guys only)", "mog (to outdo someone, use for guys only)", "tea (gossip or secrets, use for girls only)", "auramaxxing (when someone is trying to be too cool, verb)", " . Don't put the words in quotes when you use them, and don't force usage. Add emojis to the descriptions sparingly but well.
          Output the red flags in valid JSON with this structure:
            {
            "red_flags": [
                {
                "title": "Short phrase applying to the user (4 words or less)",
                "description": "Short sentence, 10 words or less"
                },
                ...
            ]
            }

            Do not provide additional text or formatting outside of this JSON.`
        },
        {
          role: 'user',
          content: `Gender: ${gender}\nAnswers: ${answers.join('\n')}`
        }
      ],
      temperature: 0.7,
    });

    console.log(response.choices[0].message.content);
    return NextResponse.json({ analysis: response.choices[0].message.content });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
} 