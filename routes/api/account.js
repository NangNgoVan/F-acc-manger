const express = require('express')
const accountApiRouter = express.Router()
const db = require('../../database/db')
const checkAuth = require('../../middleware/check-auth')

//accountApiRouter.use(checkAuth)

// create new account
accountApiRouter.post('/api/account/new', checkAuth, (req, res) => {
    const { username, password } = req.body

    db.beginTransaction(function (dbConn) {
        dbConn.query(`insert into users (username,password) values ('${username}', '${password}')`, (err, results, fields) => {
            if (err) {
                res.status(403).json({ isSuccessed: false, err: err })
                return dbConn.rollback()
            }
            var uid = results.insertId
            //
            dbConn.query(`insert into fb_storages (name, owner_id) values ('${username}', ${uid})`, (err, results, fields) => {
                if (err) {
                    res.status(403).json({ isSuccessed: false, err: err })
                    return dbConn.rollback()
                }

                //
                dbConn.commit(function (err) {
                    if (err) {
                        res.status(403).json({ isSuccessed: false, err: err })
                        return dbConn.rollback()
                    }
                    res.status(200).json({ isSuccessed: true, user: { id: results.insertId } })
                })
            })
        })
    })
})

// update an account
accountApiRouter.post('/api/account/update', checkAuth, (req, res) => {
    const { username, password, id } = req.body

    if (!id) {
        res.status(500).json({ isSuccessed: false })
        return
    }

    db.beginTransaction(function(dbConn) {

        dbConn.query(`UPDATE users SET username='${username}', PASSWORD='${password}' WHERE id=${id}`, (err, results, fields) => {
            if (err) {
                res.status(500).json({ isSuccessed: false, err: err })
                return dbConn.rollback()
            }

            dbConn.query(`update fb_storages set name='${username}' where owner_id=${id}`, (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false, err: err })
                    return dbConn.rollback()
                }
                dbConn.commit(function(err) {
                    if (err) {
                        res.status(500).json({ isSuccessed: false, err: err })
                        return dbConn.rollback()
                    }
                    res.status(200).json({ isSuccessed: true, user: { id: id } })
                })
            })
        })

    })
})

// load account
accountApiRouter.get('/api/account', checkAuth, (req, res) => {
    db.query(`select id, username, password from users where is_admin=0`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false })
        }

        var accounts = []

        for (let i = 0; i < results.length; i++) {
            accounts.push({ id: results[i].id, username: results[i].username, password: results[i].password })
        }
        res.status(200).json({ isSuccessed: true, accounts: accounts })
    })
})

// delete an account
accountApiRouter.post('/api/account/delete', checkAuth, (req, res) => {
    const { id } = req.body

    if (!id) {
        res.status(500).json({ isSuccessed: false })
        return
    }

    db.beginTransaction(function(dbConn){
        dbConn.query(`delete from users where id=${id}`, (err, results, fields) => {
            if (err) {
                res.status(500).json({ isSuccessed: false, err: err })
                return dbConn.rollback()
            }
            dbConn.query(`delete from fb_storages where owner_id=${id}`, (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false, err: err })
                    return dbConn.rollback()
                }
                dbConn.commit(function(err) {
                    if (err) {
                        res.status(500).json({ isSuccessed: false, err: err })
                        return dbConn.rollback()
                    }
                    res.status(200).json({ isSuccessed: true })
                })
            })
        })
    })
})

module.exports = accountApiRouter
