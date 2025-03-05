import * as fs from "fs";

/**
 * Reads a file and returns its contents as a string.
 * 
 * @param path - The path to the file to be read
 * @returns The contents of the file as a UTF-8 encoded string
 * @throws Error if the file does not exist, does not have .php extension or other problems reading the file. Must be handled by caller.
 */
export default function autofixReadFile(path: string): string {
    // check file exists
    if (!fs.existsSync(path)) {
        throw new Error(`File does not exist: ${path}`);
    }

    // check file extension if requiredExtension is provided
    const requiredExtension = 'php';
    if (requiredExtension && !path.toLowerCase().endsWith(requiredExtension.toLowerCase())) {
        throw new Error(`File must have ${requiredExtension} extension: ${path}`);
    }

    const contents = fs.readFileSync(path, 'utf-8');
    // check if file is empty
    if (contents.trim().length === 0) {
        throw new Error(`File is empty: ${path}`);
    }
    return contents;
}