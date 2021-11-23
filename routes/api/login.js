
const express = require('express')
const loginApiRouter = express.Router()

const jwt = require('jsonwebtoken')

const db = require('../../database/db')

loginApiRouter.post('/api/auth/login', async (req, res) => {
    //
    var { email, password, adminRole } = req.body

    db.query(`select id, username from users where username="${email}" and password="${password}" and is_admin=${adminRole?1:0}`, function (err, results, fields) {
        if (!results || results.length==0) {
            res.status(403).json({})
        }
        else {
            var uid = results[0].id
            var username = results[0].username

            const token = jwt.sign({
                data: { uid: uid, adminRole: adminRole, username: username }
            }, process.env.SECRET_KEY, { expiresIn: '1h' })
            res.cookie('_token', token)
            res.status(200).json({ uid: uid, username: username })
        }
    })
})

module.exports = loginApiRouter
