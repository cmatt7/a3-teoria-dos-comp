/**
 * 
 * @param {*} input 
 * @returns Análise léxica
 */
function lexica(input) {
    const regex = /\s*([+\-*/()]|\d+)\s*/g;
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

        if (!token.match(/\d+/)) {
            throw new Error(`Token inválido: ${token}`);
        }

        index++;
        return parseInt(token);
    }

    function parseFactor() {
        if (tokens[index] === '(') {
            index++;
            const result = parseExpression();
            if (tokens[index] !== ')') {
                throw new Error('Parênteses não fechados corretamente.');
            }
            index++;
            return result;
        } else {
            return parseNumber();
        }
    }

    function parseTerm() {
        let result = parseFactor();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === '*' || operator === '/') {
                index++;
                const nextFactor = parseFactor();
                result = operator === '*' ? result * nextFactor : result / nextFactor;
            } else {
                break;
            }
        }

        return result;
    }

    function parseExpression() {
        let result = parseTerm();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === '+' || operator === '-') {
                index++;
                const nextTerm = parseTerm();
                result = operator === '+' ? result + nextTerm : result - nextTerm;
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
const expressao = '(3 + 4) * 2 - 6 / 2';
const resultado = semantica(expressao);
console.log(`
    Resultado da expressão\n
    -> ${resultado}
`);