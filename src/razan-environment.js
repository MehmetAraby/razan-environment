const fs = require('node:fs');
const { EnvFunctions } = require('./env-functions');

/**
 * **`DotRazan(): object`**
 *
 * Parses the **`.razan` configuration file from the root of the project
 * and returns its contents as a structured JavaScript object.
 *
 * - Supports sections using `[SECTION]` syntax.
 * - Evaluates dynamic values using built-in functions.
 * - Skips comments and empty lines.
 * - Accepts functions like `randomUUID()`, `env("KEY")`, etc.
 *
 * ### 🧪 Example
 * Given a `.razan` file:
 * ```txt
 * APP_NAME is "Razan";
 * IS_ENABLED is True;
 * 
 * [database]
 * HOST is "localhost";
 * ID is randomUUID();
 * ```
 *
 * Calling:
 * ```js
 * const env = DotRazan();
 * console.log(env.APP_NAME);        // "Razan"
 * console.log(env.IS_ENABLED);      // true
 * console.log(env.database.HOST);   // "localhost"
 * ```
 *
 * @returns {object} The parsed and evaluated configuration as a JavaScript object.
 */
function DotRazan() {
    const ReadFile = fs.readFileSync(`${process.cwd()}/.razan`, 'utf8');
    const Lines = ReadFile.split(/\r?\n/);
    const JSON = {};
    let CurrentSection = null;

    for (let Value of Lines) {
        Value = Value.trim();

        if (!Value.length || Value.startsWith('#')) continue;

        if (Value.startsWith('[') && Value.endsWith(']')) {
            CurrentSection = Value.slice(1, -1);
            JSON[CurrentSection] = {};
            continue;
        }

        const Line = Value.match(/^(\w+)\s+is\s+(.+);$/);
        if (!Line) continue;

        const [, LineKey, LineValue] = Line;
        const LangFunctions = EnvFunctions(LineValue.trim());

        if (CurrentSection) {
            JSON[CurrentSection][LineKey] = LangFunctions;
        } else {
            JSON[LineKey] = LangFunctions;
        }
    }

    return JSON;
}

exports.DotRazan = DotRazan;