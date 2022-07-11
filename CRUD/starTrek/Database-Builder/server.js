//Require dependancies
const { request } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 8005
require('dotenv').config()

//Decalred variables for database
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'star-trek-api'

//Connect to Mongodb
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//Set middleware
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//CRUD methods
app.get('/',(req,res) =>{
   let contents = db.collection('species').find().toArray()
    .then(data =>{
        let nameList = data.map(ele => ele.name)
        console.log(nameList)
        res.render('index.ejs', {info:nameList})
    })
    .catch(err => console.error(err))
    
})

//created a new species entry to mongodb
app.post('/api',(req,res) =>{
    console.log('Post requested')
    db.collection('species').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

//updates an existing mongodb document
app.put('/updateEntry', (req,res) => {
    Object.keys(req.body).forEach(key => {
        if(!req.body[key]) delete req.body[key]
    })
    console.log(req.body)
    db.collection('species').findOneAndUpdate(
        {name: req.body.name},
        {
            $set: req.body
        }
    )
    .then(result =>{
        res.json('Success')
    })
    .catch(err => console.error(err))
})

//delete a mongodb document
app.delete('/deleteEntry', (req,res) => {
    db.collection('species').deleteOne(
        {name: req.body.name},
    )
    .then(result => {
        console.log(result)
        res.json('Entry deleted')
    })
    .catch(err => console.error(err))
})

//Set up localhost on listen
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})