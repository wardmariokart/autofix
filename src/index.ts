import autofixCommand from "./autofixCommand.js";
import { autofixClaudeDiff } from "./autofixLLM.js";
import autofixReadFile from "./autofixReadfile.js";
import dotenv from "dotenv";
dotenv.config();

const options = autofixCommand()

try {
    const contents = autofixReadFile(options.source);
    const claudeMessage = await autofixClaudeDiff(contents, options.apiKey);
    console.log(claudeMessage);
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: ' + (error instanceof Error ? error.message : String(error)));
    process.exit(1);
}

/*
Possible improvements:
----------------------
- Lower LLM cost by: 
    - This vulnerability can be detected using static analysis, therefore we know exactly which lines are vulnerable. Only send those for LLM to fix.
    - Doing diff locally with real git diff.
- Better prompt engineering depending on the desired format and real world use case 
- Give the cli some love
*/