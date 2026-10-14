const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const bornInput = process.argv[4]

const url = `mongodb+srv://krosqvist1:${password}@cluster0.xtbuvxu.mongodb.net/bookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

const Author = mongoose.model('Author', schema)

const author = new Author({
  name: nameInput,
  born: bornInput,
})

if (process.argv.length < 4) {
  Author.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else {
  author.save().then(result => {
    console.log(`added ${result.name} born ${result.born} to phonebook`)
    mongoose.connection.close()
  })}
