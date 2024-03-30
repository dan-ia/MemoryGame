let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    tecnologias: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    definirCartas: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {

        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon

    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },

    checkGameOver() {

        return this.cards.filter(card=>!card.flipped).length == 0;
    },


    criarCartasDaFrente: function () {

        this.cards = [];

        this.tecnologias.forEach((tec) => {                     // of é dentro // MANEIRA 1
            this.cards.push(this.criarParesDeCartasDaFrente(tec));
        })
        this.cards = this.cards.flatMap(pair => pair);              // se usar (map) teria só 10 cartas, usando o (FlatMap) tenho 20 cartas.
        this.embaralharCartas();
        return this.cards;
    },

    criarParesDeCartasDaFrente: function (tec) {
        return [{                                           //return [{},{}] dois objetos
            id: this.criarIdParaAsTecnologias(tec),              // crio uma função para gerar id logo a baixo
            icon: tec,
            flipped: false,                                 // sempre falso pra não mostrar o icon
        }, {
            id: this.criarIdParaAsTecnologias(tec),
            icon: tec,
            flipped: false,
        }];
    },

    criarIdParaAsTecnologias: function (tec) {
        return tec + parseInt(Math.random() * 1000);

    },

    embaralharCartas: function (cards) {
        let IndexAtual = this.cards.length;
        let indexAleatorio = 0;

        while (IndexAtual !== 0) {

            indexAleatorio = Math.floor(Math.random() * IndexAtual);   // floor = elemento anterior
            IndexAtual--;

            [this.cards[indexAleatorio], this.cards[IndexAtual]] = [this.cards[IndexAtual], this.cards[indexAleatorio]]; // aqui só inverti os valores a e b troca valores com b e a
        }

    }
}

