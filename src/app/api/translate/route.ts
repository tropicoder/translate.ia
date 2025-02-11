import { creatorTag, errors, languages } from "@/constants/data";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { text, lang } = await request.json();

  const active = process.env.NEXT_PUBLIC_ACTIVE === "true";

  const includesForbiddenPhrase = creatorTag.some((phrase) =>
    text.toLowerCase().includes(phrase)
  );

  if (includesForbiddenPhrase) {
    return NextResponse.json(
      { text: errors.creatorMessage, success: true },
    );
  }

  if (!active) {
    return NextResponse.json(
      { message: errors.active, success: false },
      { status: 400 }
    );
  }

  if (!text) {
    return NextResponse.json(
      { message: errors.notext, success: false },
      { status: 400 }
    );
  }

  if (!lang) {
    return NextResponse.json(
      { message: errors.notext, success: false },
      { status: 400 }
    );
  }

  const isValidLanguage = languages.some((language) => language.value === lang);

  if (!isValidLanguage) {
    return NextResponse.json(
      { message: errors.badlang, success: false },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Only return the translated text, without any explanations, formatting, or quotes. if language of text to translate is ${lang}, don't translate, just return 'ERROR'`,
        },
        {
          role: "user",
          content: `Translate the following text to ${lang}. Do NOT use quotes or any additional text:\n\n${text}`,
        },
      ],
    });

    const translatedText = response.choices[0]?.message?.content;

    if (translatedText === "ERROR") {
      return NextResponse.json(
        { message: errors.same, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: translatedText,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: errors.error, success: false },
      { status: 400 }
    );
  }
}
