const Parent = document.querySelector('.grid');
const Cards = [
          './imgs/ace-clubs.jpg','./imgs/jack-diamonds.jpg',
          './imgs/5-spades.png','./imgs/ace-hearts.png', 
          './imgs/2-diamonds.png', './imgs/7-spades.png', 
          './imgs/king-clubs.jpg', './imgs/3-clubs.png']
const Number_of_cards = Cards.length;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cardClickHandler(event) {
  revealCard(event.currentTarget);
}

function switchOnclick(toggle) {
  if(toggle == 'on') {
    img.forEach(card_back => {
      card_back.addEventListener('click', cardClickHandler);
    })
  }
  else if(toggle == 'off'){
    img.forEach(card_back => {
      card_back.removeEventListener('click', cardClickHandler);
    })
  }
}

function areEqualCards() {
  if(selected_cards[0].src == selected_cards[1].src) {
    for(let i = 0; i < img.length; i++) {
      if(img[i] == selected_cards[0]) {
        img[i].style.pointerEvents = 'none';
        img[i].style.opacity = 0;
        break;
      }
    }
    for(let i = 0; i < img.length; i++) {
      if(img[i] == selected_cards[1]) {
        img[i].style.pointerEvents = 'none';
        img[i].style.opacity = 0;
        break;
      }
    }
    return true;
  } 
}

async function revealCard(element) {
  element.style.pointerEvents = 'none';
  element.src = cards_src[element.id];
  selected_cards.push(element);
  cards_clicked++;
  if (cards_clicked == 2) {
    switchOnclick('off');
    await sleep(1000);
    if(areEqualCards() != true) {
      selected_cards.forEach(card => {
        card.src = './imgs/card-back.jpg';
        card.style.pointerEvents = 'auto';
      });
    }
    cards_clicked = 0;
    selected_cards.splice(0,2);
    switchOnclick('on');
  }
}

function createGrid() {
  let deck = Array.from(Cards);
  for (let i = 0; i < Number_of_cards; i++) {
    let new_element = document.createElement('img');
    new_element.src = './imgs/card-back.jpg';
    new_element.className = 'card-back';
    new_element.id = count;
    let random_card_number = Math.floor(Math.random() * deck.length);
    cards_src[count] = deck[random_card_number];
    deck.splice(random_card_number, 1);
    count++;
    Parent.appendChild(new_element);
  }
}

function preventDivResizing() {
  let div_width = Parent.offsetWidth;
  let div_height = Parent.offsetHeight;
  Parent.style.minHeight = div_height + 'px';
  Parent.style.minWidth = div_width + 'px';
  Parent.style.maxHeight = div_height + 'px';
  Parent.style.maxWidth = div_width + 'px';
}

function startGame() {
  createGrid();
  createGrid();
  preventDivResizing();
  img = document.querySelectorAll('img');
  switchOnclick('on');
}

card_clicked = '';
cards_src = [];
count = 0;
cards_clicked = 0;
selected_cards = [];

startGame();
