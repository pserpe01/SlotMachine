//Importar o package que foi instalado para recolher os imputs do utilizador
const prompt = require('prompt-sync')();

//Variáveis para a dimensão da slot
const ROWS = 3;
const LINES = 3;

//Variáveis para os símbolos da slot e as suas quantidades por coluna. 
const SIMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

//Variáveis para os valores de cada símbolo da slot
const SIMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


//Função para o utilizador depositar o dinheiro
const deposit = () => {
  while(true) {
    const depositAmount = prompt("Introduza o valor a depositar: ");

    //Converter a variável de string para um float
    const numberDepositAmount = parseFloat(depositAmount);

    //Verificação do valor introduzido
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0)
    {
      console.log("Montante inválido. Tente outra vez");
    }
    else
    {
      return numberDepositAmount;
    }
  }
};

//Função que pede ao utilizador para indicar o número de linhas em que vai apostar
const getNumberOfLinesToBet = () => {
  while(true)
  {
    //Pedir ao utilizador o número de linhas que vai apostar
    const lines = prompt("Indique o número de linhas que pretende apostar (1-3): ");

    //Converter a variável de string para um inteiro
    const numberOfLines = parseInt(lines);

    //Fazer a verificação se foi introduzido um número
    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)
    {
      console.log("Número de linhas inválido")
    }
    else
    {
      return numberOfLines;
    }
  };
}

//Função que vai recolher a aposta do utilizador
const getBet = (balance, lines) => {
  while(true)
  {
    //Saldo existente
    console.log(`\nSaldo: ${balance}\nLinhas: ${lines}`);

    //Pedir ao utilizador para introduzir o valor da sua aposta
    const placeBet = prompt("Introduza o valor da sua aposta por linha: ");

    //Converter a variável de string para um inteiro
    const placeBetNumber = parseFloat(placeBet);

    //Faz a verificação se é um número
    if(isNaN(placeBetNumber))
    {
      console.log("Aposta inválida");
    }

    //Multiplicação para saber o valor da aposta total
    const totalBet = placeBetNumber * lines;

    //Faz a verificação para saber se a aposta passa o saldo disponível
    if(placeBetNumber <= 0 || placeBetNumber > balance || totalBet > balance)
    {
      console.log("A aposta é inválida");
    }
    else
    {
      return totalBet;
    }
  };
  
}



let depositAmount = deposit();
console.log(depositAmount);

const numberOfLines =  getNumberOfLinesToBet();
console.log(numberOfLines);

const bet = getBet(depositAmount, numberOfLines);
console.log(bet);

