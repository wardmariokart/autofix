import autofixCommand from "./autofixCommand.js";
import { autofixClaudeDiff } from "./autofixLLM.js";
import autofixReadFile from "./autofixReadfile.js";
import dotenv from "dotenv";
dotenv.config();

const options = autofixCommand()

try {
    const contents = autofixReadFile(options.source);
    const diff = await autofixClaudeDiff(contents, options.apiKey);
    console.log(diff);
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: ' + (error instanceof Error ? error.message : String(error)));
    process.exit(1);
}

/*
Possible improvements:
----------------------
- lower the LLM api cost by reducing the php code inside prompt to the bare minimum. 
    - Depens on how much we want rely on the LLM on detecting the vulnerability as opposed to fixing it.
    - The fact that aikido dev would likely flag before suggesting an autofix suggests that this would be te way to go?
*/