const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://loginUser:fwJGo5eUOWm9fho6@cluster0.ggphq.mongodb.net/user?retryWrites=true&w=majority"
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const bookings = client.db("user").collection("users");

    app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        bookings.insertOne(newBooking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// fwJGo5eUOWm9fho6  loginUser