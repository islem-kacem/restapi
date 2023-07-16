require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
   
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });

  

  var Person = mongoose.model('Person', personSchema);

 const islem = new Person({name: "Jane Fond", age: 60, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
    islem.save()
    .then(() => {
      console.log('User created successfully');
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });
    
    module.exports = mongoose.model('Person', personSchema);
