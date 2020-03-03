const Parent = document.querySelector('.grid');
const Cards = ['ace-clubs.jpg','jack-diamonds.jpg','5-spades.png','ace-hearts.png', '2-diamonds.png', '7-spades.png', 'king-clubs.jpg', '3-clubs.png']
const Number_of_cards = Cards.length;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function switchOnclick(toggle) {
  if(toggle == 'on') {
    console.log('on')
    img.forEach(card_back => {
      card_back.addEventListener('click', revealCard(card_back));
    })
  }
  else if(toggle == 'off'){
    console.log('off')
    img.forEach(card_back => {
      card_back.removeEventListener('click', revealCard(card_back));
    })
  }

}

function areEqualCards() {
  if(selected_cards[0].src == selected_cards[1].src) {
    selected_cards.forEach(elem => {
      elem.parentNode.removeChild(elem);
    })
  }
}

async function revealCard(element) {
  element.src = cards_src[element.id];
  selected_cards.push(element);
  cards_clicked++;
  if (cards_clicked == 2) {
    switchOnclick('off');
    await sleep(1000);
    areEqualCards();
    selected_cards.forEach(data => {
      data.src = './card-back.jpg';
    });
    cards_clicked = 0;
    selected_cards.splice(0,2);
  }
}

function createGrid() {
  let deck = Array.from(Cards);
  for (let i = 0; i < Number_of_cards; i++) {
    let new_element = document.createElement('img');
    new_element.src = './card-back.jpg';
    new_element.className = 'card-back';
    new_element.id = count;
    let random_card_number = Math.floor(Math.random() * deck.length);
    cards_src[count] = deck[random_card_number];
    deck.splice(random_card_number, 1);
    count++;
    Parent.appendChild(new_element);
  }
}

function startGame() {
  createGrid();
  createGrid();
  img = document.querySelectorAll('img');
  switchOnclick('on');
  switchOnclick('off');
}

cards_src = [];
count = 0;
cards_clicked = 0;
selected_cards = [];

startGame();
