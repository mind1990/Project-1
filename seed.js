const db = require('./models');

// const new_user = [
//   {
//     userName: 'Praveen',
//     password: 'password',
//     profilePic: 'URL',
//     age: 29
//   },
//   {
//     userName: 'Tirapat',
//     password: 'password2',
//     profilePic: 'URL',
//     age: 29
//   },
//   {
//     userName: 'Mark',
//     password: 'password3',
//     profilePic: 'URL',
//     age: 24
//   },
// ]
//
// const new_memory = [
//   {
//     title: 'Dr. ',
//     name: 'Tirapat',
//     description: 'Moved from New York City!',
//     image: 'URL',
//     date: 'September 1st, 2018',
//   },
//   {
//     title: 'Professor ',
//     name: 'Mark',
//     description: 'Moved from South Florida!',
//     image: 'URL',
//     date: 'September 5th, 2018',
//   },
//   {
//     title: 'Mr. ',
//     name: 'Praveen',
//     description: ' From East Bay!',
//     image: 'URL',
//     date: 'September 1st, 2014',
//   },
// ]
//
// db.User.deleteMany({}, (err, users) => {
//   if(err) throw err;
//   console.log(`Users deleted`);
//
//   db.User.create(new_user, (err, users) => {
//     if (err) throw err;
//     console.log(`User created: ${users}`);
//   });
// });
//
// db.Memory.deleteMany({}, (err, memories) => {
//   if(err) throw err;
//   console.log(`Memories deleted`);
//
//   db.Memory.create(new_memory, (err, memories) => {
//     if(err) throw err;
//     console.log(`New memories saved: ${memories}`);
//     process.exit();
//   });
// });

var newUser =
  {
    userName: 'Tirapat',
    password: 'password2',
    profilePic: 'URL',
    age: 29
  }


var newMemory =
  {
    title: 'Dr. ',
    name: 'Tirapat',
    description: 'Moved from New York City!',
    image: 'URL',
    date: 'September 1st, 2018',
  }


db.Memory.deleteMany({}, (err, deletedMemories) => {
  if (err) throw err;
  console.log('Deleted memories')
  db.User.deleteMany({}, (err, deletedUsers) => {
    if (err) throw err;
    console.log('Deleted users')
    db.Memory.create(newMemory, (err, savedMemory) => {
      if (err) throw err;
      console.log(`Created new memory: ${savedMemory}`)
      db.User.create(newUser, (err, savedUser) => {
        if (err) throw err;
        console.log(`New user created: ${savedUser}`)
        savedMemory.user = savedUser;
        // savedUser.markModified(savedMemory.user);
        savedMemory.save((err, updatedUser) => {
          process.exit();
        });
      });
    });
  })
})