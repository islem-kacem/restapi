const { Router } = require("express");
const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
const app = express();
app.use(express.json());

const port = 3000;
var Person2 = mongoose.model("Person", personSchema);
app.post("/models/User", (req, res) => {
  const Person = {
    message: "POST request received",
    data: req.body,
  };
  const islem = new Person2(Person.data);
  islem
    .save()
    .then(() => {
      res.send("User created successfully" + islem);
    })
    .catch((error) => {
      res.send("Error creating user:", error);
    });
  res.send(Person.data);

});




app.get("/User", function (req, res) {
  Person2.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});


app.put('/update/:id', async (req,res) => {
try {
  await Person2.findByIdAndUpdate(
    {_id:req.params.id},
    {
   name:req.body.name ,
    }
  );
  res.send('avec succes bien');
}
catch(err){
  res.send(err);
}
});



app.delete('/delete/:id', async (req,res) => {
  try {
    await Person2.findByIdAndDelete({id: req.params.id})
    res.send('avec succes bien delete');
  }
  catch(err){
    res.send(err);
  }
  });







app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
