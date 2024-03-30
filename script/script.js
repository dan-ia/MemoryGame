const FRONT = "card-front";
const BACK = "card-back";
const ICON = "icon";
const CARD = "card";


let tecnologias = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
];

let cards = null;                                     // null = não tem nada por enquanto

const iniciarJogo = () => {
    cards = criarCartasDaFrente(tecnologias);
    embaralharCartas(cards);
    iniciarCartas(cards)
}

const iniciarCartas = (cards) => {
    let gameBoard = document.getElementById('gameBoard');

    cards.forEach(card => {                                 //MANEIRA 2

        let ElementoCard = document.createElement('div');
        ElementoCard.id = card.id;
        ElementoCard.classList.add(CARD);
        ElementoCard.dataset.icon = card.icon;

        criarContainerDaCarta(card, ElementoCard);

        ElementoCard.addEventListener('click', virarCard);
        gameBoard.appendChild(ElementoCard);
    });
}


const criarContainerDaCarta = (card, ElementoCard) => {
    criarFaceDaCarta(FRONT, card, ElementoCard);
    criarFaceDaCarta(BACK, card, ElementoCard);
}

const criarFaceDaCarta = (face, card, elemento) => {

    let faceCardElemento = document.createElement('div');
    faceCardElemento.classList.add(face);
    if (face === FRONT) {
        let ElementoDoIcone = document.createElement('img');
        ElementoDoIcone.classList.add(ICON);
        ElementoDoIcone.src = "./img/" + card.icon + ".png";
        faceCardElemento.appendChild(ElementoDoIcone)

    } else {
        faceCardElemento.innerHTML = '&lt/&gt';
    }
    elemento.appendChild(faceCardElemento);
}


const embaralharCartas = (cards) => {
    let IndexAtual = cards.length;
    let indexAleatorio = 0;

    while (IndexAtual !== 0) {

        indexAleatorio = Math.floor(Math.random() * IndexAtual);   // floor = elemento anterior
        IndexAtual--;

        [cards[indexAleatorio], cards[IndexAtual]] = [cards[IndexAtual], cards[indexAleatorio]]; // aqui só inverti os valores a e b troca valores com b e a
    }

}

const criarCartasDaFrente = (tecnologias) => {
    let cards = [];

    for (let tec of tecnologias) {                      // of é dentro // MANEIRA 1
        cards.push(criarParesDeCartasDaFrente(tec));
    }
    return (cards.flatMap(pair => pair));              // se usar (map) teria só 10 cartas, usando o (FlatMap) tenho 20 cartas.
}

const criarParesDeCartasDaFrente = (tec) => {
    return [{                                           //return [{},{}] dois objetos
        id: criarIdParaAsTecnologias(tec),              // crio uma função para gerar id logo a baixo
        icon: tec,
        flipped: false,                                 // sempre falso pra não mostrar o icon
    }, {
        id: criarIdParaAsTecnologias(tec),
        icon: tec,
        flipped: false,
    }];
}

const criarIdParaAsTecnologias = (tec) => {
    return tec + parseInt(Math.random() * 1000);

}

function virarCard() {               // this. não reconhece => arrow function
   this.classList.add("flip");

}


iniciarJogo();
criarCartasDaFrente(tecnologias);