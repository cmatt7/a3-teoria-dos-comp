/**
 * 
 * @param {*} input 
 * @returns Análise léxica
 */
function lexica(input) {
    const regex = /\s*([0-9]+|\S)\s*/g;
    const tokens = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        tokens.push(match[1]);
    }

    return tokens;
}

/**
 * 
 * @param {*} tokens 
 * @returns Análise sintática
 */
function parser(tokens) {
    let index = 0;

    function parseNumber() {
        const token = tokens[index];

        if (!token.match(/[0-9]+/)) {
            throw new Error(`Token inválido: ${token}`);
        }

        index++;
        return parseInt(token);
    }

    function parseFactor() {
        let result = parseNumber();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === '*') {
                index++;
                result *= parseNumber();
            } else if (operator === '/') {
                index++;
                const divisor = parseNumber();
                if (divisor === 0) {
                    throw new Error('Divisão por zero não permitida.');
                }
                result /= divisor;
            } else {
                break;
            }
        }

        return result;
    }

    function parseExpression() {
        let result = parseFactor();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === '+') {
                index++;
                result += parseFactor();
            } else if (operator === '-') {
                index++;
                result -= parseFactor();
            } else {
                break;
            }
        }

        return result;
    }

    return parseExpression();
}

/**
 * 
 * @param {*} input 
 * @returns Análise semântica
 */
function semantica(input) {
    const tokens = lexica(input);
    const result = parser(tokens);
    return result;
}


/**
 * Àrea de testes
 */
const expressao = '2 * 4 + 3 - 6 / 2';
const resultado = semantica(expressao);
console.log(`
    Resultado da expressão\n
    -> ${resultado}
`);