const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://titre:titre@cluster0.khoqt.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')

    const db = client.db('titre')
    const titreCollection = db.collection('titrecrud2')

    app.set('view engine', 'ejs')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.listen(3000, function () {
        console.log('listening on 3000')

    })

    app.get('/', (req, res) => {
        db.collection('titrecrud2').find().toArray()
            .then(results => {
                res.render('index.ejs', { titrecrud2: results })
            })
            .catch(error => console.error(error))


    })

    app.post('/confirmation', (req, res) => {
        titreCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect("/")
            })
            .catch(error => console.error(error))
    })
})



