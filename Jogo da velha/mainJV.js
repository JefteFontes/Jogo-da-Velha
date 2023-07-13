//Ocutação dos elementos com as determinadas classes
document.querySelector(".telaJogo").style.display = "none"
document.querySelector(".telaFinal").style.display = "none"

//Variáveis globais
let jogadorAtual = 'X'
let jogoDaVelha = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
let placar = []
let simboloDavez = document.getElementById("vez")
let jogadores = []
let ganhador

//Função utilizada para as determinações iniciais
function entrada(){
  //Definição de um objeto que receberá os nomes dos dois jogadores e o simbolo escolhido em login
  class Jogador{
      nome 
      nome2
      simb

      constructor(nNome, nNome2, nSimb){
          this.nome = nNome
          this.nome2 = nNome2
          this.simb = nSimb
      }
  }

  jogador = new Jogador()
  jogador.nome = document.getElementById("name").value
  jogador.nome2 = document.getElementById("name2").value
  jogador.simb = document.querySelector('input[name = "simb"]:checked').value

  //Nomes dos jogadores guardados em um array
  jogadores = [jogador.nome, jogador.nome2]
  
  //Variável utilizada para o determinar o simbolo inicial
  jogadorAtual = jogador.simb

  //Tratativas para caso o úsuario não coloque os nomes
  if(jogadores[0] == '' && jogadores[1] == ''){
    jogadores[0] = jogadorAtual

    if (jogadores[0] == 'X') {
      jogadores[1] = 'O'
    } else 
      jogadores[1] = 'X'
  } 
  else if (jogadores[0] == '') {
    jogadores[0] = jogadorAtual
  } 
  else {
    if (jogadorAtual == 'X') {
      jogadores[1] = 'O'
    } else 
      jogadores[1] = 'X'
  }

  //Oculta a tela de login
  document.querySelector(".borda").style.display = "none"
  //Zera o placar 
  placar=[0,0]
  //Tira a ocultação da tela de jogo
  document.querySelector(".telaJogo").style.display = ""
  //Exibe na página quem iniciará o jogo
  simboloDavez.textContent = 'Vez de: '+jogadorAtual
  exibirJogo()
  atualizarPlacar()

}

//Função verifica se há um ganhador no jogo ou se ocorreu um empate
function verificarGanhador() {
  //Verificação das linhas
  for (var i = 0; i < 3; i++) {
    if (jogoDaVelha[i][0] !== '' && jogoDaVelha[i][0] === jogoDaVelha[i][1] && jogoDaVelha[i][0] === jogoDaVelha[i][2]) {
      return jogoDaVelha[i][0]
    }
  }
  //Verificação das colunas
  for (var j = 0; j < 3; j++) {
    if (jogoDaVelha[0][j] !== '' && jogoDaVelha[0][j] === jogoDaVelha[1][j] && jogoDaVelha[0][j] === jogoDaVelha[2][j]) {
      return jogoDaVelha[0][j]
    }
  }

  //Verificação das diagonais 
  if (jogoDaVelha[0][0] !== '' && jogoDaVelha[0][0] === jogoDaVelha[1][1] && jogoDaVelha[0][0] === jogoDaVelha[2][2]) {
    return jogoDaVelha[0][0]
  }

  if (jogoDaVelha[0][2] !== '' && jogoDaVelha[0][2] === jogoDaVelha[1][1] && jogoDaVelha[0][2] === jogoDaVelha[2][0]) {
    return jogoDaVelha[0][2]
  }

  let empate = -1

  //Verificação de caso ocorrer empate
  for (let linha = 0; linha < 3; linha++) {
    for (let colu = 0; colu < 3; colu++) {
      if (jogoDaVelha[linha][colu] === '') {
        empate = 0
        break
      }
    }
    if (empate == 0) {
      break
    }
  }
  if (empate === -1) {
    return 'empate'
  }

  //Jogo em andamento
  return 'continua'
}
//Função chamada quando um quadrado do jogo for clicado
function jogar(posicao) {

  //Calcula a linha e a coluna correspondentes à posição clicada.
  let linha = Math.floor(posicao / 3)
  let colu = posicao % 3

  //Verificação se a posição é válida
  if (linha >= 0 && colu <= 3 && jogoDaVelha[linha][colu] === '') {
    //Atualiza a matriz com o simbolo da quadrado clicado
    jogoDaVelha[linha][colu] = jogadorAtual

    //Verificação se houve um ganhador ou um empate.
    let simb_vez = verificarGanhador()

    //Atualização da interface de jogo
    exibirJogo()
    
    //Verificações de continuidade do jogo ou encerramento
    if (simb_vez === 'X' || simb_vez === 'O') {
      if (simb_vez === jogador.simb) {
        //Informa o ganhador da rodada
        alert('O jogador ' + jogadores[0] + ' venceu!')
        //Atualiza o placar
        placar[0]++
        //Guarda o nome do ganhador até a ultima rodada
        ganhador = jogadores[0]
      } else {
        alert('O jogador ' + jogadores[1] + ' venceu!')
        placar[1]++
        ganhador = jogadores[1]
      }
      //Chamada para a proxima rodada
      reinicio()
    } else if (simb_vez === 'empate') {
      //Informa o empate da rodada
      alert('O jogo terminou em empate!')
      reinicio()
    } else {
      //Troca do jogador atual e atualiza a vez na interface do jogo.
        if(jogadorAtual === 'X'){
          jogadorAtual = 'O'
          simboloDavez.textContent = 'Vez de: '+jogadorAtual
        } else 
          jogadorAtual = 'X'
          simboloDavez.textContent = 'Vez de: '+jogadorAtual
    }
  }
}

//Função que cria e atualiza a interface do jogo, exibindo o os quadrados com os símbolos das jogadas. 
function exibirJogo() {
  //Variável que recebe a div correspondente
  let elementoJogo = document.getElementById('jogo')

  //Limpa a div jogo para não acumular vários quadrados a cada passada na função
  elementoJogo.innerHTML = ''
  let cont = 0
  //Percorrendo o tabuleiro e criando os elementos na div jogo
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let quadrado = document.createElement('div')
      //Atribuição de uma classe aos quadrados criados
      quadrado.className = 'quadrado'
      //Atribuição de uma posição ao quadrado a partir da incrementação de cont
      quadrado.dataset.posicao = cont
      //Chamada da função jogar ao clicar em um dos quadrados
      quadrado.addEventListener('click', function () { 
        jogar(this.dataset.posicao)
      })
      cont++
      //Criação de div que receberam os simbolos 
      let simbolo = document.createElement('div')
      simbolo.className = 'simbolo'
      //Escreve na div o simbolo correspodente a posição na matriz
      simbolo.innerHTML = jogoDaVelha[i][j]

      //As divs simbolo são adicionados como filhos da div quadrado.
      quadrado.appendChild(simbolo)
      //Os quadrados são adicionados como filhos da div "jogo" na página HTML.
      elementoJogo.appendChild(quadrado)
    }
  }
}

//Função para atualizar o placar na página HTML
function atualizarPlacar() {
  let LjogadorX = document.getElementById('jogador-x')
  let LjogadorO = document.getElementById('jogador-o')
  LjogadorX.textContent = 'Jogador '+jogadores[0]+': ' + placar[0]
  LjogadorO.textContent = 'Jogador '+jogadores[1]+': ' + placar[1]
}

//Reinicia o jogo, atualizando a interface da página
function reinicio() {
  atualizarPlacar()
  //Verifica se algum jogador atingiu a pontuação máxima para exibir a tela final
  if(placar[0]==3 || placar[1]==3)
  {
    document.querySelector(".telaJogo").style.display = "none"
    document.querySelector(".borda").style.display = "none"
    document.querySelector(".telaFinal").style.display = ""

    let vitoria = document.getElementById('ganhador')

    vitoria.textContent = ganhador+' ganhou!'
  }
  else
  {
    //Reinicia a matriz e o jogador atual
    jogoDaVelha = [
      ['', '', ''], 
      ['', '', ''],
      ['', '', '']
    ]
    jogadorAtual = jogador.simb
    exibirJogo()
  }
}

//Função para quando o jogador retorna à tela inicial
function retornoInicio() {
  document.querySelector(".telaJogo").style.display = "none"
  document.querySelector(".borda").style.display = ""
  document.querySelector(".telaFinal").style.display = "none"
  jogoDaVelha = [
      ['', '', ''], 
      ['', '', ''],
      ['', '', '']
  ]
}
