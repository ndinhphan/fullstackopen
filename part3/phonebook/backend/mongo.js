const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('Please provide password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] || "password1234"

const url = `mongodb+srv://fullstack:${password}@fullstackopen.diuqv.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  }).then(result =>{
    console.log('connected to MongoDB')
  }).catch(error=>{
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,

})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: "phan",
//   phone: "0379071742"
// })

if (process.argv.length==5){
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4]
  })
  person.save().then(result=>{
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook `)
    mongoose.connection.close()
  })
}
//save to online db
else if(process.argv.length == 3) {
  Person.find({}).then(result=>{
    console.log('phonebook:')
    result.forEach(p =>{
      console.log(p.name + " " + p.phone)
    })
    mongoose.connection.close()
  })
}

