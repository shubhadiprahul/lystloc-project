require('dotenv').config()

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_URL
    },
    
})

knex.schema.createTable("users",(table) =>{
    table.increments('id')
    table.string('name')
    table.string('number')
    table.string('email')
    table.string('csrf_token')
}).then((resp) => {
    console.log({
        msg: "table created!!"
    })
}).catch((err) => {
    console.log({
        msg: "table already created"
    })
})


module.exports = knex;