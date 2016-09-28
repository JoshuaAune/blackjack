var result = '';
var bet = 0;
var button = '<div onclick="newRound()" class="button">DEAL</div><div onclick="betAmount(5)" class="button">+5</div><div onclick="betAmount(-5)" class="button">-5</div>';
var betButtons = '';
var doubleButton = ''
var blackjack = false;
var doubling = false;
var player = {
  hand: [],
  cards: [],
  value: 0,
  bank: 100
}


var dealer = {
  hand: [],
  cards: [],
  value: 0

}

document.getElementById('bank').innerHTML = player.bank;
document.getElementById('bet').innerHTML = bet;
document.getElementById('buttons').innerHTML = button;


function betAmount(amount){
  bet += amount;

  if(bet < 0){bet = 0;}
  document.getElementById('bet').innerHTML = bet;
  document.getElementById('bank').innerHTML = player.bank;
}

function card(){
  var random = Math.floor(Math.random() * (newDeck.length - 1)) + 1;
  console.log(random);
  console.log(newDeck[random]);
  var card = newDeck[random];
  newDeck.splice(random, 1);
  return card;

}

function newHand(player){

  var card1 = card();
  var card2 = card();

  player.hand.push(card1);
  player.hand.push(card2);
  player.cards.push('<div class="card"><img src="'+card1.url+'"></div>');
  player.cards.push('<div class="card top-card"><img src="'+card2.url+'"></div>');


}

function handValue(player){
    player.value = 0;
  for(var i = 0; i < player.hand.length; i++){
    player.value += player.hand[i].value;
  }

}

function newRound(){
  freshDeck();
  player.bank -= bet;
  result = '';
  button =     '<div onclick="hit(player)" class="button">HIT</div>' + '<div onclick="stand()" class="button">STAND</div><div onclick="doubleDown()" class="button">Double Down</div>';
  document.getElementById('result').innerHTML = result;
  document.getElementById('bet').innerHTML = bet;
  document.getElementById('buttons').innerHTML = button;

  player.hand = [];
  player.cards = [];
  dealer.hand = [];
  dealer.cards = [];
  newHand(dealer);
  newHand(player);
  handValue(dealer);
  handValue(player);
  blackjack = false;
  if(player.value === 21){dealer.value = 0;blackjack = true; stand()};

  document.getElementById('player').innerHTML = player.cards.join('');
  document.getElementById('dealer').innerHTML = '<div class="card"><img src="SVG-cards-1.3/back_of_card.jpg"></div>' + dealer.cards[1];
  document.getElementById('bank').innerHTML = player.bank;

}

function hit(player){
  var newCard = card();
  player.hand.push(newCard);
  player.cards.push('<div class="card"><img src="'+newCard.url+'"></div>');
  var testValue = player.value + newCard.value;
  document.getElementById('buttons').innerHTML = '<div onclick="hit(player)" class="button">HIT</div>' + '<div onclick="stand()" class="button">STAND</div>';

  if(testValue <= 21){
    aS.value = 11;
    aH.value = 11;
    aD.value = 11;
    aC.value = 11;

    handValue(player);
  }
  else if(testValue > 21){
    aS.value = 1;
    aH.value = 1;
    aD.value = 1;
    aC.value = 1;

    handValue(player);
  }
  aS.value = 11;
  aH.value = 11;
  aD.value = 11;
  aC.value = 11;

  document.getElementById('player').innerHTML = player.cards.join("");
  if(player.value > 21){result = 'YOU BUST'; lose()}
  document.getElementById('result').innerHTML = result;
}

function doubleDown(){
  player.bank -= bet;
  doubling = true;
  hit(player);
  stand();

}

function stand(){
  while(dealer.value < 17){
    var newCard = card();
    dealer.hand.push(newCard);
    dealer.cards.push('<div class="card"><img src="'+newCard.url+'"></div>');
    dealer.value += newCard.value;
  }

  document.getElementById('dealer').innerHTML = dealer.cards.join('');
  if(blackjack === true){
    result = 'BLACKJACK!';
     win();
     player.bank += bet/2
  }
  if(dealer.value > 21 && blackjack != true){
    result = 'DEALER BUST YOU WIN';
    win();
  }
  else if(dealer.value > player.value){
     result = 'DEALER WINS'; lose()
   }
  else if(dealer.value < player.value && blackjack != true){
     result = 'YOU WIN';
     win();
   }
  else if(dealer.value === player.value){
     result = 'PUSH';
      tie();
   };

    document.getElementById('result').innerHTML = result;
}

function win(){
  if(doubling === true){player.bank += bet * 4}
  else if(doubling === false){player.bank += bet * 2}


  button = '<div onclick="newRound()" class="button">DEAL</div><div onclick="betAmount(5)" class="button">+5</div><div onclick="betAmount(-5)" class="button">-5</div>';
  document.getElementById('bank').innerHTML = player.bank;
  document.getElementById('buttons').innerHTML = button;
  document.getElementById('bet').innerHTML = bet;
}

function lose(){

  button = '<div onclick="newRound()" class="button">DEAL</div><div onclick="betAmount(5)" class="button">+5</div><div onclick="betAmount(-5)" class="button">-5</div>';
  document.getElementById('bank').innerHTML = player.bank;
  document.getElementById('buttons').innerHTML = button;
  document.getElementById('bet').innerHTML = bet;
}

function tie(){
  player.bank += bet;
  button = '<div onclick="newRound()" class="button">DEAL</div><div onclick="betAmount(5)" class="button">+5</div><div onclick="betAmount(-5)" class="button">-5</div>';

  document.getElementById('bank').innerHTML = player.bank;
  document.getElementById('buttons').innerHTML = button;
  document.getElementById('bet').innerHTML = bet;
}


 newRound();
