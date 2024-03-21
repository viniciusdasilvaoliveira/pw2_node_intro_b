const inquiirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

operation();
createAccount();

function operation () {
    inquiirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer? ',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }        
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar contar') {
            createAccount();
        }
        
        else if (action === 'Consultar saldo') {
            getAccountBalance();
        }
        
        else if (action === 'Depositar') {
            deposit();
        }
        
        else if (action === 'Sacar') {
            withdraw();
        }
        
        else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts Node!'));
            process.exit();
        }
    })
}

function createAccount() {
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Node Bank'));
    console.log(chalk.green('Vamos criar sua conta agora...'))

    builAccount()
}

function builAccount () {
    inquiirer.prompt ([
        {
            name: 'accountName',
            message: 'Entre com nome da sua conta: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        //Trata de nome vazio.
        if (accountName === "") {
            console.error('Não é permitido contas com nome vazio.')
            operation()
        }


        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        //Trata da exitência da conta
        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.error(chalk.bgRed.black(`A conta: ${accountName} já exite.`))
            console.error(chalk.red('Escolha outro nome: '))

            builAccount(accountName)
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            `{"balance":0}`,
            function error(err) {
                console.error(err)
            }
        )
        console.info (chalk.bgGreen.white(`Sua conta: ${accountName} foi criada, parabéns!`))
        console.info(chalk.green('Pode começar a opera-la!'))

        operation()
    })
}
