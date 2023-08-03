//Importar o package que foi instalado para recolher os imputs do utilizador
const prompt = require('prompt-sync')();

//Variáveis para a dimensão da slot
const COLS = 3;
const ROWS = 3;

//Variáveis para os símbolos da slot e as suas quantidades por coluna. 
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

//Variáveis para os valores de cada símbolo da slot
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
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

//Função que vai rodar a slot
const spin = () => {
  //Este array vai guardar todos os símbolos e o seu valor respetivo possíveis
  const symbols = [];

  //Este for vai correr todos os símbolos pertencentes ao objeto SYMBOLS_COUNT
  for(const [symbol, count] of Object.entries(SYMBOLS_COUNT))
  {
    //Este for irá inserir os símbolos dentro do array
    for(let i = 0; i < count; i++)
    {
      symbols.push(symbol);
    }
  }

  //Estes arrays simboliza as colunas da slot que vão ser adicionadas cada vez que o for completar uma volta
  const reels = [];

  //Criar dois array para criar as colunas e as linhas da slot
  for(let i = 0; i < COLS; i++)
  {
    //Vai adicionar as colunas da slot ao array
    reels.push([]);

    //Este array vai guardar o elemento que calhou e vai retirar de modo a que não volte a calhar na mesma coluna
    const reelSymbols = [...symbols];

    for(let j = 0; j < ROWS; j++)
    {
      //Vai escolher o simbolo aleatoriamente
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];

      //Vai inserir na coluna
      reels[i].push(selectedSymbol);

      //Vai remover do array o simbolo escolhido
      reelSymbols.splice(randomIndex, 1);
    };
  };

  return reels;
}

//Função que vai reorganizar o output de acordo com o resultado que saiu em cada linha de cada coluna
const transpose = (reels) => {
  const rows = [];

  for( let i = 0; i < ROWS; i++)
  {
    rows.push([]);
    for(let j = 0; j < COLS; j++)
    {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
}

//Função que vai dar o output totalmente organizado
const printRows = (rows) => {
  for(const row of rows)
  {
    let rowString = "";
    for(const [i, symbol] of row.entries())
    {
      rowString += symbol;
      if(i != row.length - 1)
      {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

//Função que vai verificar se o utilizador ganhou
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for(let row = 0; row < lines; row++)
  {
    const symbols = rows[row];
    let allSame = true;

    for(const symbol of symbols)
    {
      if(symbol != symbols[0])
      {
        allSame = false;
        break;
      }
    }

    if(allSame)
    {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }

  return winnings;
}

const game = () => {
  let depositAmount = deposit();

  while(true){
    console.log("Dinheiro disponível: " + depositAmount.toString() + "€");
    const numberOfLines =  getNumberOfLinesToBet();
    console.log(numberOfLines);

    const bet = getBet(depositAmount, numberOfLines);
    console.log(bet);

    depositAmount -= bet;

    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);

    const winnings = getWinnings(rows, bet, numberOfLines);
    depositAmount += winnings;
    console.log("Ganhou " + winnings.toString() + "€");

    if(depositAmount <= 0)
    {
      console.log("Já não tem dinheiro suficiente para continuar a jogar!");
      break;
    }

    const playAgain = prompt("Pretende continuar a jogar (s/n)? ");

    if(playAgain != "s") break;
  }
}

game();

