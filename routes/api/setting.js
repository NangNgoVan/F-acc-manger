const express = require('express')
const settingApiRouter = express.Router()
const db = require('../../database/db')
const checkAuth = require('../../middleware/check-auth')

//
settingApiRouter.get('/api/admin/setting', checkAuth, (req, res) => {
    db.query(`select data from users where id = ?`, [req.user.uid], (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false })
        }
        var data = {}
        if (results.length>0) data = results[0].data
        res.status(200).json({ isSuccessed: true, data: data })
    })
})

settingApiRouter.post('/api/admin/setting', checkAuth, (req, res) => {
    var {data} = req.body
    db.query(`update users set data = ? where id = ?`, [JSON.stringify(data), req.user.uid], (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false, err: err })
            return
        }
        res.status(200).json({ isSuccessed: true })
    })
})

module.exports = settingApiRouter;
