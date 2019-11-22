const express = require('express'),
      path = require('path'),  
      app = express();

app.use(require('./users'));
app.use(require('./teams'));
app.use(require('./games'));
app.use(require('./user_game'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = app;