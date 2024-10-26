const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconIniciarOuPausarBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio ('sons/luna-rise-part-one.mp3');
const somPlay = new Audio ('sons/play.wav');
const somPause = new Audio ('sons/pause.mp3');
const somFim = new Audio ('sons/beep.mp3');

musica.loop = true;

let tempoDecorridoEmSegundos = null;
let intervaloId = null;

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})


focoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})   

longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })

    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;

    }
}

const contagemRegressiva = () =>{
    tempoDecorridoEmSegundos -= 1;
    if(tempoDecorridoEmSegundos <=0){
        somFim.play();
        parar();
        alert('Tempo esgotado');
        return;
    }
    mostrarTempo();
    console.log('Temporizador = '+tempoDecorridoEmSegundos);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        parar();
        return;
    }
    iniciarOuPausarBt.textContent = 'Pausar';
    iconIniciarOuPausarBt.setAttribute('src', './imagens/pause.png');
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function parar(){
    iniciarOuPausarBt.textContent = "Começar";
    iconIniciarOuPausarBt.setAttribute('src', './imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId =null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();