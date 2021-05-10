const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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
          res.send({insertedCount:0})
        } else {

          donerCollection.insertOne(req.body)
            .then(result => {
              res.send({insertedCount:1})

            })
        }
      })



  });



  app.get('/doner', (req, res) => {
    const group = req.query.blood;
    console.log(group)
    donerCollection.find({ blood: { $regex: group } })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })


  app.get('/singledoner', (req, res) => {
    const id = req.query.id;
    donerCollection.find({ _id: ObjectId(id) })
      .toArray((err, document) => {
        res.send(document[0]);
      })
  })






  app.get('/', (req, res) => {

    res.send('Hello World!')
  })

  console.log("connected")
});






app.listen(process.env.PORT || port)
