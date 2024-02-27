// if (op == "+") {
//     return (chalk.bgBlue.white(`${n1} ${op} ${n2} = ${(n1+n2)}`))
// }else 

// if (op == "-") {
//     return (chalk.bgGreen.black(`${n1} ${op} ${n2} = ${(n1-n2)}`))    
// }else

// if (op == "*" ) {
//     return (chalk.bgCyan.magenta(`${n1} ${op} ${n2} = ${(n1*n2)}`))    
// }else

// if (op == "/") {
//     return (chalk.bgYellow.red(`${n1} ${op} ${n2} = ${(n1/n2)}`))
// }

// else {
//     return(chalk.bgRed.yellow(`Invalid Operation`))
// }
    const chalk = require('chalk')

    function calculadora (n1, n2, op) {

    switch (op)
    {
        case  '+': 
            return (chalk.bgBlue.white(`${n1} ${op} ${n2} = ${(n1+n2)}`))

        case '-': 
            return (chalk.bgGreen.black(`${n1} ${op} ${n2} = ${(n1-n2)}`))

        case '*':
            return (chalk.bgCyan.magenta(`${n1} ${op} ${n2} = ${(n1*n2)}`))   

        case '/':    
            return (chalk.bgYellow.red(`${n1} ${op} ${n2} = ${(n1/n2)}`))
            
        default:
            return(chalk.bgRed.yellow(`Invalid Operation`))    
    }
}

    console.log(calculadora(135, 61, "+"))
    console.log(calculadora(135, 61, "-"))
    console.log(calculadora(15, 5, "*"))
    console.log(calculadora(144, 12, "/"))
    console.log(calculadora(32, 6, "|"))