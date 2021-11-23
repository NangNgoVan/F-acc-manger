const express = require('express')
const reportApiRouter = express.Router()
const db = require('../../database/db')
const checkAuth = require('../../middleware/check-auth')
var moment = require('moment')

reportApiRouter.get('/api/report/:from.:to', checkAuth, (req, res) => {
    var {from, to} = req.params
    db.query(`SELECT COUNT(*) AS accs_num, DATE(fb_accs.created_at) AS report_date, fb_storages.NAME AS storage_name  FROM fb_accs right JOIN fb_storages on fb_accs.storage_id = fb_storages.id AND DATE(fb_accs.created_at) BETWEEN ? AND ? GROUP BY storage_name, report_date`,
    [from, to]
    , (err, results, fields) => {
        if (err) {
            res.status(500).json({isSuccessed: false, acc_num: 0})
            return
        }
        const reportData = [];
        for (var i = 0; i < results.length; i++) {
            var elm = {}
            if (!results[i].report_date) elm.accsNum = 0
            else elm.accsNum = results[i].accs_num
            elm.storageName = results[i].storage_name
            elm.reportDate = moment(results[i].report_date).format('DD/MM/YYYY')
            reportData.push(elm)
        }
        res.status(200).json({isSuccessed: true, reportData: reportData})
    })
})


module.exports = reportApiRouter;
