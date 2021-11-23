const db = require('../database/db')

module.exports = function checkConnection(req, res, next) {
    db.testConnection(err=>{
        if (err) res.status(500).json({isSuccessed: false, err: 'connect_err'})
        else next()
    })
}
