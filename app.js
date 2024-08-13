// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha os números entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentantivas = 1;
// funcao para componentes html
function exibirTextonaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    // usando as funcoes
    exibirTextonaTela('h1', 'Jogo do número Secreto');
    exibirTextonaTela('p', 'Escolha os números entre 1 e 10');
}

exibirMensagemInicial();

// funcao para verificar chute
function verificarChute(){
    let chute = document.querySelector('input').value;
 
    if (chute == numeroSecreto){
        exibirTextonaTela('h1', 'Acertou!');
        let palavraTentativa = tentantivas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentantivas} ${palavraTentativa}!`
        exibirTextonaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextonaTela('p','O numero secreto eh menor');
        }else{
            exibirTextonaTela('p', 'O numero secreto eh maior')
        }
        tentantivas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
    // variavel apra ter a quantidade de elementos na lista
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    // verificar se ja atingimos o numero maximo de quantidaes
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    // verificar se ja tem um numero escolhido na lista
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// funcao para limpar o campo
function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentantivas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);


}
