import Anthropic from "@anthropic-ai/sdk";
const MAX_TOKENS = 1024

/**
 * Interacts with the Claude API to analyze PHP code for security vulnerabilities and generate a fix.
 * 
 * This function sends the provided PHP source code to Claude and retrieves a git diff format response
 * that identifies and fixes potential vulnerabilities (particularly remote code execution issues).
 * 
 * PROMPT: can be modified using `CLAUDE_PROMPT` and `CLAUDE_SYSTEM_PROMPT` environment variables without rebuilding whole app.
 * 
 * MODEL: can be modified using `CLAUDE_MODEL` environment variable.
 * 
 * @param sourceCode - The PHP source code (string) to analyze and fix
 * @param providedApiKey - Optional Claude API key (falls back to CLAUDE_API_KEY environment variable)
 * 
 * @returns Claude's response message. 
 * 
 * @throws Error if no Claude API key is provided
 * @throws Error if the API response structure is unexpected
 */

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
