module.exports = {
    calculadora(n1, n2, op) {

        switch (op) {
            case '+':
                return (`${n1} ${op} ${n2} = ${(n1 + n2)}`)

            case '-':
                return (`${n1} ${op} ${n2} = ${(n1 - n2)}`)

            case '*':
                return (`${n1} ${op} ${n2} = ${(n1 * n2)}`)

            case '/':
                return (`${n1} ${op} ${n2} = ${(n1 / n2)}`)

            default:
                return (`Invalid Operation`)
        }
    },
    cientifica(n1, n2, op) {
        switch (op) {
            case "sr":
                return (`Raíz Quadrada: ${n1} + ${n2} = ${Math.sqrt(n1 + n2)}`)

            default:
                return (`Invalid Operation`)
        }
    }
}