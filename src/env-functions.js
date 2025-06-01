require('dotenv/config');
const { randomUUIDv7 } = require('bun');
const crypto = require('node:crypto');

/**
 * **`EnvFunctions(value: string): any`**
 *
 * Parses a **`.razan`** value string and returns the evaluated result.
 * 
 * Supports:
 * - Dynamic values like UUIDs and environment variables
 * - Casing transformations
 * - Literals: booleans, numbers, and strings
 *
 * ### 🔧 Supported Functions
 * - **`randomUUID()`** — generates a UUID v4
 * - **`randomUUIDv7()`** — generates a UUID v7 (Bun only)
 * - **`env("KEY")`** — resolves value from process.env
 * - **`toUpperCase("text")`** — converts to uppercase
 * - **`toLowerCase("TEXT")`** — converts to lowercase
 *
 * ### 🧪 Example
 * ```js
 * EnvFunctions('randomUUID()'); // → '68eab972-1a3c-41c5-a217-...'
 * EnvFunctions('toUpperCase("hello")'); // → 'HELLO'
 * EnvFunctions('"App"'); // → 'App'
 * EnvFunctions('true'); // → true
 * EnvFunctions('3000'); // → 3000
 * ```
 *
 * @param {string} value - The raw string from the `.razan` file.
 * @returns {any} Evaluated value based on the input string.
 */


function EnvFunctions(value) {
    if(value === 'randomUUID()') return crypto.randomUUID();
    if(value === 'randomUUIDv7()') return randomUUIDv7();
    const EnvFn = value.match(/^env\("(.+)"\)$/);
    if(EnvFn) return process.env[EnvFn[1]] ?? '';
    const toUpperCase = value.match(/^toUpperCase\("(.+)"\)$/);
    if(toUpperCase) return toUpperCase[1].toUpperCase();
    const toLowerCase = value.match(/^toLowerCase\("(.+)"\)$/);
    if(toLowerCase) return toLowerCase[1].toLowerCase();
    if(/^".*"$/.test(value) ||/^'.*'$/.test(value) ) return value.slice(1, -1);
    if(!isNaN(Number(value))) return Number(value);
    if(value === 'True' || value === 'true') return true;
    if(value === 'False' || value === 'false') return false;
    return value;
}

exports.EnvFunctions = EnvFunctions;