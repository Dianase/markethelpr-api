const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const { createItem, getItems } = require('./src/items')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/items', createItem)

app.get('/items:uid', getItems)

exports.app = functions.https.onRequest(app)