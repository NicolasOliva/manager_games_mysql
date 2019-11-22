const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      app = express();

require('./database');

//enable connect localhost client whit server
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));

//routes
app.use('/',require('./routes/index'));

process.env.PORT = process.env.PORT || 4000; 

app.listen(process.env.PORT,() => {
    console.log(`run on port ${process.env.PORT}`);
})