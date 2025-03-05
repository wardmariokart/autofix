import { Command } from '@commander-js/extra-typings';

/**
 * Parses command line arguments and returns the options object.
 * 
 * @returns The parsed options object if all required options are provided.
 * If required option not provided: Program will exit & show information about missing required option.
 */
export default function command() {
    const program = new Command()
        .description('Fix your backtick php vulnerability with ✨ai✨')
        .option('-s, --source <path>', 'path to the file to be fixed.', process.env.VULNERABLE_FILE)
        .option('--api-key <char>', 'Claude api key to be used')
    program.parse(process.argv);

    return program.opts();
}