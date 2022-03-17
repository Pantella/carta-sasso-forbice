let scoreUser=0,
    scoreComputer=0;

const   SCORE_USER_SPAN=document.querySelector('#score-user'),
        SCORE_COMPUTER_SPAN=document.querySelector('#score-computer'),
        BADGE_USER=document.querySelector('#badge-user'),
        BADGE_COMPUTER=document.querySelector('#badge-computer'),
        CHOICE_LITERAL=document.querySelector('.choice-literal'),
        CHOICE=document.querySelector('.choice'),
        MOTTO=document.querySelector('.motto');

CHOICE.addEventListener('click',gestioneEvento);

function gestioneEvento(evt) {
    let scelta=evt.target.getAttribute('data-game');
    CHOICE.removeEventListener('click',gestioneEvento);
    let partita=scelta+computerChoice();

    checkGame(partita);
    setTimeout(starter,1000);
}

function computerChoice() {
    let esiti=['r','p','s'];
    let indice=Math.floor(Math.random()*3);
    return esiti[indice]
}

function checkGame(partita) {
    switch (partita) {
        case 'rs':
        case 'pr':
        case 'sp':
            win(partita);
            break
        case 'sr':
        case 'rp':
        case 'ps':
            lose(partita);
            break
        case 'ss':
        case 'rr':
        case 'pp':
            draw(partita);
            break
    }
}

function win(partita) {
    scoreUser++;
    aggiornaPunteggio();
    frasi(partita,'win');
    BADGE_USER.classList.add('badge-win');
    BADGE_COMPUTER.classList.add('badge-lose');
    MOTTO.classList.add('motto-win');
}

function lose(partita) {
    scoreComputer++;
    aggiornaPunteggio();
    frasi(partita,'lose');
    BADGE_USER.classList.add('badge-lose');
    BADGE_COMPUTER.classList.add('badge-win');
    MOTTO.classList.add('motto-lose');
}

function draw(partita) {
    frasi(partita,'draw');
    MOTTO.classList.add('motto-draw');
}

function aggiornaPunteggio() {
    SCORE_USER_SPAN.innerHTML=scoreUser;
    SCORE_COMPUTER_SPAN.innerHTML=scoreComputer;
    
}

function frasi(partita,esito) {
    let partitaUser=partita.substring(0,1);
    let partitaComputer=partita.substring(1);
    let wordUser=traduzione(partitaUser);
    let wordComputer=traduzione(partitaComputer);
    let wordaction='';
    let wordMotto='';

    switch (esito) {
        case 'win':
            wordaction='beats';
            wordMotto='YOU WIN!';
            break
        case 'lose':
            wordaction='loses against';
            wordMotto='YOU LOSE!';
            break
        case 'draw':
            wordaction='equals';
            wordMotto="THAT'S A DRAW!";
            break
    }

    let phrase=`your ${wordUser} ${wordaction} Computer's ${wordComputer}`;
    
    CHOICE_LITERAL.innerHTML=phrase;
    MOTTO.innerHTML=wordMotto;
    

    function traduzione(lettera) {
        switch (lettera) {
            case 'r':
                return 'Rock';
            case 'p':
                return 'Paper';
            case 's':
                return 'Scissors';
        }
    }
}

function starter() {
    CHOICE.addEventListener('click',gestioneEvento);
    MOTTO.innerHTML='Make your move';
    BADGE_USER.classList.remove('badge-win');
    BADGE_USER.classList.remove('badge-lose');
    BADGE_COMPUTER.classList.remove('badge-win');
    BADGE_COMPUTER.classList.remove('badge-lose');
    MOTTO.classList.remove('motto-win');
    MOTTO.classList.remove('motto-lose');
    MOTTO.classList.remove('motto-draw');
}