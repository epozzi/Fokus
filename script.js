const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const bannerImage = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
// const iniciarOuPausarTeste = startPauseBt.querySelector('#start-pause span') funciona como a linha de cima
const imagemBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somAcabouOTempo = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervalorId = null;

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

musica.loop = true;
musica.volume = 0.04;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoFoco;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoCurto;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');

})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoLongo;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(b => b.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    bannerImage.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somAcabouOTempo.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervalorId) {
        somPause.play()
        zerar();
        return;
    }
    somPlay.play();
    intervalorId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemBt.setAttribute('src', '/imagens/pause.png');
    // botoes.forEach(b => b.setAttribute('disabled', true));
}

function zerar() {
    clearInterval(intervalorId);
    iniciarOuPausarBt.textContent = 'Começar';
    imagemBt.setAttribute('src', '/imagens/play_arrow.png');
    // botoes.forEach(b => b.removeAttribute('disabled'));
    intervalorId = null;
}

function mostrarTempo() {
    // usando o date para formatar o tempo que aparece na tela
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); //*1000 pois o Date trabalha com milisegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();