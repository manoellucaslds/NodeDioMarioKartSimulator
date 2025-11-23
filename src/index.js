const readline = require("readline-sync"); // Leitura síncrona do terminal

// 🏁 Definição dos Tipos de Pista 
const TRACK_TYPES = {
  STRAIGHT: "RETA",
  CURVE: "CURVA",
  BATTLE: "CONFRONTO",
};

// 🎮 Dados dos Jogadores
const Players = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Browser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 4,
    PONTOS: 0,
  },
];

// 🎲 Lança um dado de 6 lados.
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 🛤️ Obtém um bloco/tipo de pista aleatório.
function getRandomBlock() {
  const random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = TRACK_TYPES.STRAIGHT;
      break;
    case random < 0.66:
      result = TRACK_TYPES.CURVE;
      break;
    default:
      result = TRACK_TYPES.BATTLE;
      break;
  }
  return result;
}

// 💬 Loga os resultados de uma rodada no console.
function logPlayers(player, dice, skillName, testSkill) {
  const skillValue = player[skillName];
  console.log(
    `${player.NOME} rolou o dado e o resultado foi: ${dice}`
  );
  console.log(`Atributo (${skillName}): ${skillValue}`);
  console.log(`Total: ${dice} + ${skillValue} = ${testSkill}\n`);
}

// 🏆 Determina o vencedor da rodada e atualiza os pontos.
function determineRoundWinner(
  character1,
  character2,
  testSkillPlayer1,
  testSkillPlayer2,
  block
) {
  if (testSkillPlayer1 > testSkillPlayer2) {
    console.log(
      `${character1.NOME} ganhou a disputa de ${block} e ganhou 1 ponto!`
    );
    character1.PONTOS++;
  } else if (testSkillPlayer2 > testSkillPlayer1) {
    console.log(
      `${character2.NOME} ganhou a disputa de ${block} e ganhou 1 ponto!`
    );
    character2.PONTOS++;
  } else {
    console.log(
      `A disputa de ${block} acabou em empate! Ninguém ganha pontos.`
    );
  }
}

// 🏎️ Simula uma única corrida de 5 rodadas (race).
function playRace(character1, character2) {
  // Resetar pontos para garantir que a corrida é justa se a função for chamada novamente.
  character1.PONTOS = 0;
  character2.PONTOS = 0;

  console.log(`\n\n=== 🏁 INÍCIO DA CORRIDA: ${character1.NOME} vs ${character2.NOME} 🏁 ===`);

  for (let round = 1; round <= 5; round++) {
    const block = getRandomBlock();
    const dicePlayer1 = rollDice();
    const dicePlayer2 = rollDice();

    let skillName;
    let skillPlayer1;
    let skillPlayer2;

    console.log(`\n---------------------------------`);
    console.log(`Rodada ${round} - Tipo de Pista: ${block}`);
    console.log(`---------------------------------`);

    // Define qual habilidade será usada.
    switch (block) {
      case TRACK_TYPES.STRAIGHT:
        skillName = "VELOCIDADE";
        skillPlayer1 = character1.VELOCIDADE;
        skillPlayer2 = character2.VELOCIDADE;
        break;
      case TRACK_TYPES.CURVE:
        skillName = "MANOBRABILIDADE";
        skillPlayer1 = character1.MANOBRABILIDADE;
        skillPlayer2 = character2.MANOBRABILIDADE;
        break;
      case TRACK_TYPES.BATTLE:
        skillName = "PODER";
        skillPlayer1 = character1.PODER;
        skillPlayer2 = character2.PODER;
        break;
    }

    const testSkillPlayer1 = dicePlayer1 + skillPlayer1;
    const testSkillPlayer2 = dicePlayer2 + skillPlayer2;

    logPlayers(character1, dicePlayer1, skillName, testSkillPlayer1);
    logPlayers(character2, dicePlayer2, skillName, testSkillPlayer2);
    
    determineRoundWinner(
      character1,
      character2,
      testSkillPlayer1,
      testSkillPlayer2,
      block
    );
  }

  displayFinalResults(character1, character2);
}

// 🎉 Exibe os resultados finais.
function displayFinalResults(character1, character2) {
  console.log("\n=================================");
  console.log("🏆 RESULTADO FINAL 🏆");
  console.log("=================================");
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(
      `\nO grande ganhador do torneio é ${character1.NOME} com um total de ${character1.PONTOS} pontos!`
    );
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(
      `\nO grande ganhador do torneio é ${character2.NOME} com um total de ${character2.PONTOS} pontos!`
    );
  } else {
    console.log("\nO torneio terminou em um empate!");
  }
}


// 👤 Função para selecionar um jogador
function selectPlayer() {
  while (true) {
    const option = readline.question(
      `1 - Escolher seu personagem\n2 - Personagem aleatório\n> `
    );

    if (option === "1") {
      let playerIndex;
      const listPrompt = `Escolha seu personagem:\n${Players.map(
        (value, key) => `${key} - ${value.NOME}`
      ).join("\n")}\n> `;
      
      playerIndex = parseInt(readline.question(listPrompt));

      // Verifica se a entrada é um número e está dentro do range
      if (!isNaN(playerIndex) && playerIndex >= 0 && playerIndex < Players.length) {
        // Retorna uma CÓPIA do objeto para que as pontuações não interfiram na próxima partida.
        return { ...Players[playerIndex] }; 
      } else {
        console.clear();
        console.log("⚠️ Opção de personagem inválida! Por favor, escolha uma opção válida.");
      }
    } else if (option === "2") {
      const randomIndex = Math.floor(Math.random() * Players.length);
      // Retorna uma CÓPIA do objeto.
      return { ...Players[randomIndex] }; 
    } else {
      console.clear();
      console.log("⚠️ Opção inválida! Por favor, escolha '1' ou '2'.");
    }
  }
}

// 🚀 Função principal (pode manter async IIFE para boa prática em Node.js)
(function main() {
  console.log("=== BEM-VINDO AO MARIO KART SIMULATOR! ===");
  
  console.log("\n--- Seleção do Jogador 1 ---");
  const player1 = selectPlayer();
  console.log(`\nJOGADOR 1 SELECIONADO: ${player1.NOME}`);

  console.log("\n--- Seleção do Jogador 2 ---");
  const player2 = selectPlayer();
  console.log(`\nJOGADOR 2 SELECIONADO: ${player2.NOME}`);

  playRace(player1, player2);
})();