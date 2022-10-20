const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Expected arguments: [password] [name: string (Optional)] [number: string (Optional)]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://HRemonen:${password}@cluster0.s3f37md.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Find and print every person in database
if (process.argv.length === 3){
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}
else if (process.argv.length < 6) {
  const personObject = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  personObject.save().then(() => {
    console.log(`Person ${personObject.name}, number ${personObject.number} added to Phonebook!`)
  })
}
else {
  console.log('Check arguments! Given arguments too long.')
}

mongoose.connection.close()




