const express = require('express');

let router = express.Router();

router.get('/guess', (req, res) => {
  let guesses = req.session.guesses;
  let secret = req.session.secret;

  if (secret === undefined || guesses[guesses.length] === secret) {
    req.session.secret = Math.floor((Math.random() * 1000) + 1);
    req.session.guesses = [];
    guesses = req.session.guesses;
    secret = req.session.secret;
  }

  let html = generatePageHtml(guesses, secret);
  res.send(html);
});

router.post('/guess', (req, res) => {
  let guess = req.body.guess;
  let guesses = req.session.guesses;
  let secret = req.session.secret;

  if (secret === undefined || guesses[guesses.length] === secret) {
    req.session.secret = Math.floor((Math.random() * 1000) + 1);
    req.session.guesses = [];
    guesses = req.session.guesses;
    secret = req.session.secret;
  } else {
    if (!isNaN(guess)) {
      guesses.push(guess);
    }
  }

  let html = generatePageHtml(guesses, secret);
  res.send(html);
});

function generatePageHtml (guesses, secret) {
  let solved = guesses[guesses.length - 1] === secret;
  let htmlPageStart = '<!DOCTYPE html><title>Guess my secret!</title><h1>Guess my secret!</h1>';
  let htmlPageContent = '';
  let htmlPageEnd = '';

  if (solved) {
    htmlPageContent += generateSolvedMessageHtml(guesses.length);
  } else {
    htmlPageContent += '<form method="POST"><label for="guess">Guess:</label><input type="text" id="guess" name="guess"/><input type="submit" value="Go"/></form>';
  }

  htmlPageContent += generateGuessesTableHtml(guesses, secret);

  return htmlPageStart + htmlPageContent + htmlPageEnd;
}

function generateSolvedMessageHtml (numberOfGuesses) {
  let htmlDivStart = '<div id="correct"><p>';
  let htmlDivContent = 'You got it!  It took you ' + numberOfGuesses + ' guesses.';
  let htmlDivEnd = '<p><a href="guesss">Play again</a></div>';
  return htmlDivStart + htmlDivContent + htmlDivEnd;
}

function generateGuessesTableHtml (guesses, secret) {
  if (guesses.length === 0) {
    return '';
  }

  let htmlTableStart = '<div id="guesses">Here are your previous guesses<table>';
  let htmlTableContent = '';
  let htmlTableEnd = '</table></div>';

  // TODO reverse order
  for (let guess of guesses) {
    htmlTableContent += '<tr>';
    htmlTableContent += '<td>' + guess + '</td>';
    htmlTableContent += '<td>' + (guess > secret) ? 'Too high' : 'Too low' + '</td>';
    htmlTableContent += '</tr>';
  }

  return htmlTableStart + htmlTableContent + htmlTableEnd;
}

module.exports = router;
