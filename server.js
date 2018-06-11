// Developer: Mike Schmoyer
// Created: June 6, 2018

const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');
const port    = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

// Use only during site maintainence
// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // console.log('Request found!');
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my NodeJS server!',
    pageTitle: 'Home Page'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 101,
    message: 'Error handling request.'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Portfolio'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
