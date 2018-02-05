const express = require('express');

let router = express.Router();

router.get('/guess', (req, res) => {
  let guesses = req.session.guesses;
  let secret = req.session.secret;
  let correct = false;

  if (secret === undefined || guesses[guesses.length - 1] === secret) {
    if (secret !== undefined && guesses[guesses.length - 1] === secret) {
      correct = true;
    }
    req.session.secret = Math.floor((Math.random() * 1000) + 1);
    req.session.guesses = [];
    guesses = req.session.guesses;
    secret = req.session.secret;
  }

  let guessesWithStatus = [];
  for (let guess of guesses) {
    guessesWithStatus.push({
      number: guess,
      low: (guess < secret)
    });
  }

  guessesWithStatus.reverse();

  res.render('index', {
    guesses: guessesWithStatus,
    correct: correct
  });
});

router.post('/guess', (req, res) => {
  let guess = req.body.guess;
  let guesses = req.session.guesses;
  let secret = req.session.secret;
  let correct = false;

  console.log(secret);

  if (secret === undefined || guesses[guesses.length - 1] === secret) {
    if (secret !== undefined && guesses[guesses.length - 1] === secret) {
      correct = true;
    }
    req.session.secret = Math.floor((Math.random() * 1000) + 1);
    req.session.guesses = [];
    guesses = req.session.guesses;
    secret = req.session.secret;
  } else {
    if (!isNaN(guess)) {
      guesses.push(Number(guess));
    }
  }

  let guessesWithStatus = [];
  for (let guess of guesses) {
    guessesWithStatus.push({
      number: guess,
      low: (guess < secret)
    });
  }

  guessesWithStatus.reverse();

  res.render('index', {
    guesses: guessesWithStatus,
    correct: correct
  });
});

module.exports = router;
