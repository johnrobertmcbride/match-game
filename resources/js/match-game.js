var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(() => {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'))
})

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var unplaced = []
  var placed = []

  for (i=1; i < 9; i++) {
    unplaced.push(i);
    unplaced.push(i);
  }

  while(unplaced.length > 0) {
    var index = Math.floor(Math.random() * unplaced.length);
    placed.push(unplaced[index]);
    unplaced.splice(index, 1);
  }

  return placed;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  $game.data('flippedcards', [])
  var colors = ['hsl(25, 85%, 65%)',
                'hsl(55, 85%, 65%)',
                'hsl(90, 85%, 65%)',
                'hsl(160, 85%, 65%)',
                'hsl(220, 85%, 65%)',
                'hsl(265, 85%, 65%)',
                'hsl(310, 85%, 65%)',
                'hsl(360, 85%, 65%)'
                ]

  for(i = 0; i < 16; i++) {
    var $card = $('<div class="col-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colors[cardValues[i] - 1]);
    $game.append($card);
  }

  $('.card').on('click', event => {
    MatchGame.flipCard($(event.currentTarget), $('#game'))
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if($card.data('flipped') == true) {
    return;
  } else {
    $card.text($card.data('value'));
    $card.css('background-color', $card.data('color'));
    $card.data('flipped', true);
    $game.data('flippedcards').push($card);

    if($game.data('flippedcards').length > 1) {

      window.setTimeout(function () {

        if($game.data('flippedcards')[0].data('value') == $game.data('flippedcards')[1].data('value')) {

          $game.data('flippedcards')[0].css('color', 'rgb(204, 204, 204)');
          $game.data('flippedcards')[0].css('background-color', 'rgb(153, 153, 153)');
          $game.data('flippedcards')[1].css('color', 'rgb(204, 204, 204)');
          $game.data('flippedcards')[1].css('background-color', 'rgb(153, 153, 153)');

        } else {

          $game.data('flippedcards')[0].text('');
          $game.data('flippedcards')[1].text('');
          $game.data('flippedcards')[0].css('background-color', 'rgb(32, 64, 86)');
          $game.data('flippedcards')[1].css('background-color', 'rgb(32, 64, 86)');
          $game.data('flippedcards')[0].data('flipped', false);
          $game.data('flippedcards')[1].data('flipped', false);

        }

        $game.data('flippedcards', [])
      }, 350);

    }

  }

};
