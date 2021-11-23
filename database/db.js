const mysql = require('mysql')
require('dotenv').config()

function DB() {
    this.conntionConfig = {
        host: process.env.DB_HOST,
        user: process.env.USER_NAME,
        password: process.env.PASS_WORD,
        database: process.env.DB_NAME
    }
}

DB.prototype.testConnection = function(fn) {
    const connection = mysql.createConnection(this.conntionConfig)
    connection.connect(function(err) {
       if (err) fn(err)
       else fn(null)
       connection.end()
    })
}

DB.prototype.query = function(queryStr, fn) {
    const connection = mysql.createConnection(this.conntionConfig)
    connection.connect(function(err) {
        if(err) throw err
    })
    connection.query(queryStr, (err, results, fields) => {
        fn(err, results, fields)
    })
    connection.end()
}

DB.prototype.query = function(queryStr, values, fn) {
    const connection = mysql.createConnection(this.conntionConfig)
    connection.connect(function(err) {
        if (err) throw err
    })
    connection.query(queryStr, values , (err, results, fields) => {
        fn(err, results, fields)
    })
    connection.end()
}

DB.prototype.beginTransaction = function(fn) {
    const connection = mysql.createConnection(this.conntionConfig)
    connection.beginTransaction(function(err) {
        if (err) throw err
        //
        fn(connection)
    })
}


module.exports = new DB()
