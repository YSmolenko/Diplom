const express = require('express')
const path = require('path')
const router = require('./router')
require('./db/mongoose')

const app = express()

app.set('view engine', 'hbs')
app.set('views', (path.join(__dirname, '../public/templates/views')))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(router)


const port = process.env.PORT || 3000
app.listen(port)