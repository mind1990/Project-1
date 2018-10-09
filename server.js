const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/landing.html');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/memories', (req, res) => {
  res.sendFile(__dirname + '/views/memories.html');
});

app.get('/create-memory', (req, res) => {
  res.sendFile(__dirname + '/views/create-memory.html');
});

// Get all memories (json data) at this endpoint
app.get('/api/memories', (req, res) => {
  db.Memory.find()
    .populate('user')
    .exec((err, allMemories) => {
      if(err) throw err;
      res.json(allMemories);
    })
});

// Get all users (json data) at this endpoint
app.get('/api/users', (req, res) => {
  db.User.find((err, allUsers) => {
    if (err) throw err;
    res.json(allUsers);
  });
});

// Find all memories and render
app.get('/memories', (req, res) => {
  db.Memory.find((err, allMemories) => {
    if(err) throw err;
    res.json(allMemories)
  });
});

// Create a new memory
app.post('/api/memories', (req, res) => {
  let newMemory = req.body;
  db.Memory.create(newMemory, (err, newMemory) => {
    if (err) throw err;
    res.json(newMemory);
  });
});

// Delete a memory
app.delete('/api/memories/:id', (req, res) => {
  let id = req.params.id;
  db.Memory.findOneAndDelete({_id: id}, (err, deletedMemory) => {
    if (err) throw err;
    res.json(deletedMemory);
  });
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
