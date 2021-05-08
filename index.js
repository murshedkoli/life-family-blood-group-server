const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://life-family:jmDWm7bB926WW2XO@cluster0.dmtd1.mongodb.net/life-family?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000



client.connect(err => {
  const donerCollection = client.db("life-family").collection("doner");


  app.post('/adddoner', (req, res) => {
    donerCollection.find({ phone: req.body.phone })
      .toArray((err, document) => {
        if (document.length) {
          res.send(data)
        } else {

          donerCollection.insertOne(req.body)
            .then(result => {
              res.send(0)

            })
        }
      })



  });



  app.get('/doner', (req, res) => {
    const group = req.query.blood;
    donerCollection.find({ blood: { $regex: group } })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })





  app.get('/', (req, res) => {

    res.send('Hello World!')
  })

  console.log("connected")
});






app.listen(process.env.PORT || port)