const express = require('express');
const app = express()
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
app.use(morgan('dev'));
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cors())

const knex = require('./config/dbconn')


const user = require('./route/users')
app.use('/',user)

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
})