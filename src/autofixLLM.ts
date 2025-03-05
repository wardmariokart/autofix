import Anthropic from "@anthropic-ai/sdk";
import { error } from "console";
const MAX_TOKENS = 1024

export async function autofixClaudeDiff(sourceCode: string, providedApiKey?: string) {
    const apiKey = providedApiKey ?? process.env.CLAUDE_API_KEY;
    if (!apiKey) {
        throw new Error('🔎 No Claude API key found  Please provide one using:\n\t1️⃣ Command line: --api-key YOUR_KEY\n\t2️⃣ Environment variable: CLAUDE_API_KEY=YOUR_KEY');
    }


    const anthropic = new Anthropic({ apiKey });
    const msg = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-latest',
        max_tokens: MAX_TOKENS,
        temperature: 0,
        system: process.env.CLAUDE_SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `
                        ${process.env.CLAUDE_PROMPT}
                        <php_code>
                        ${sourceCode}
                        </php_code>
                        `
                    }
                ]
            }
        ]
    })

    const isExpected = msg.type === 'message' &&
        msg.content.length === 1 &&
        msg.content[0].type === 'text' &&
        msg.content[0].text
    if (!isExpected) {
        throw new Error(`Unexpected response structure: ${JSON.stringify(msg, null, 2)}`)
    }

    // At this point TypeScript should infer msg.content[0] is a TextBlock
    // But we can use type assertion to be explicit
    return (msg.content[0] as Anthropic.Messages.TextBlock).text;
}
