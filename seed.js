const db = require('./models');

var newUser = [
  {
    userName: 'Tirapat',
    password: 'password1',
    profilePic: 'https://i.imgur.com/zE9ezSK.png',
    age: 29
  },
  {
    userName: 'Mark',
    password: 'password3',
    profilePic: 'https://i.imgur.com/33ZErzy.jpg',
    age: 24
  },
  {
    userName: 'Praveen',
    password: 'password2',
    profilePic: 'https://i.imgur.com/jf9US6M.png',
    age: 24
  },
];

var newMemory = [
  {
    name: 'Tirapat',
    description: 'Moved from New York City!',
    image: 'https://i.imgur.com/zE9ezSK.png',
    date: 'September 1st, 2018',
  },
  {
    name: 'Mark',
    description: 'Moved from sweaty South Florida!',
    image: 'https://i.imgur.com/33ZErzy.jpg',
    date: 'September 5th, 2018',
  },
  {
    name: 'Praveen',
    description: 'From East Bay!',
    image: 'https://i.imgur.com/jf9US6M.png',
    date: 'September 1st, 2014',
  },
];

db.Memory.deleteMany({}, (err, deletedMemories) => {
  if (err) throw err;
  console.log('Deleted memories')
  db.User.deleteMany({}, (err, deletedUsers) => {
    if (err) throw err;
    console.log('Deleted users')
    newMemory.forEach((newMemory) => {
      db.Memory.create(newMemory, (err, savedMemory) => {
        if (err) throw err;
        console.log(`Created new memory: ${savedMemory}`)
        newUser.forEach((newUser) => {
          db.User.create(newUser, (err, savedUser) => {
            if (err) throw err;
            console.log(`New user created: ${savedUser}`)
            if(savedUser.userName === savedMemory.name) {
              savedMemory.user = savedUser;
              savedMemory.save((err, updatedUser) => {

              });
              // process.exit();
            }
          });
        })
      });
    })
  })
})
