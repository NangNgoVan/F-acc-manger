
const jwt = require('jsonwebtoken')
const db = require('../database/db')

module.exports = function checkAuth(req, res, next) {

    const token = req.cookies['_token']
    if (!token) {
        res.status(403).json({ isSuccessed: false, err: "Invalid token!" })
    }
    else {
        try {
            var decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded) {
                var uid = decoded.data.uid
                db.query(`select id, username, is_admin from users where id=${uid}`, (err, results, fields) => {
                    if (err) {
                        res.status(500).json({ isSuccessed: false })
                    }
                    if (results.length > 0) {
                        var user = {}
                        user.uid = results[0].id
                        user.name = results[0].username
                        user.isAdmin = results[0].is_admin
                        req.user = user
                        next()
                    }
                    else res.status(500).json({ isSuccessed: false })
                })
            }
            else {
                res.status(403).json({ isSuccessed: false, err: "Invalid token!" })
            }
        }
        catch (e) {
            res.status(403).json({ isSuccessed: false, err: "Invalid token!" })
        }
    }
}
