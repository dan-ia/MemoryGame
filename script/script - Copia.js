const FRONT = "card-front";
const BACK = "card-back";
const ICON = "icon";
const CARD = "card";


const iniciarJogo = () => {
    iniciarCartas(game.criarCartasDaFrente());
}

const iniciarCartas = (cards) => {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {                                 //MANEIRA 2

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


function virarCard() {               // this. não reconhece => arrow function

    if (game.definirCartas(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                };
            } else {
                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }

    }


}

function restart() {

    game.clearCards();
    iniciarJogo();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';


}

iniciarJogo();
criarCartasDaFrente(tecnologias);