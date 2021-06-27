/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();


// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  }).then(result => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// personSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator', message:{expected {PATH} to be unique}})


/* required options to use mongoose-unique-validator with findOneAndUpdate
findOneAndUpdate({ email: 'old-email@example.com' },
    { email: 'new-email@example.com' },
    { runValidators: true, context: 'query' },)
*/

personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
module.exports = mongoose.model('Person', personSchema);


// const person = new Person({
//   name: "phan",
//   phone: "0379071742"
// })

// if (process.argv.length==5){
//   const person = new Person({
//     name: process.argv[3],
//     phone: process.argv[4]
//   })
//   person.save().then(result=>{
//     console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook `)
//     mongoose.connection.close()
//   })
// }
// //save to online db
// else if(process.argv.length == 3) {
//   Person.find({}).then(result=>{
//     console.log('phonebook:')
//     result.forEach(p =>{
//       console.log(p.name + " " + p.phone)
//     })
//     mongoose.connection.close()
//   })
// }

