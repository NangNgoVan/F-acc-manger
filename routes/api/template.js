const express = require('express')
const templateApiRouter = express.Router()
const fbBloggerTemplate = require('../../assets/templates/fb-blogger2')
const db = require('../../database/db')
const checkAuth = require('../../middleware/check-auth')

//templateApiRouter.use(checkAuth)

templateApiRouter.post('/api/template/create', checkAuth, (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host')
    var user = req.user
    const { title, 
        line1, 
        line2, 
        fbImgLink,
        bloggerLink,
        redirectUrl } = req.body

    db.query(`select data from users where is_admin=1`, (err, results, fields) => {
        var googAnalyticsScript = ''
        if (results.length > 0) {
            var json = JSON.parse(results[0].data)
            googAnalyticsScript = json.trackingScript||''
        }
        db.query(`select id from fb_storages where owner_id=${user.uid}`, (err, results, fields) => {
            //donothing
            var sid = 0
            if (results.length > 0) sid = results[0].id
            res.json({
                result: fbBloggerTemplate(title,
                    line1,
                    line2,
                    fbImgLink,
                    bloggerLink,
                    sid,
                    googAnalyticsScript,
                    fullUrl,
                    redirectUrl)
            })
        })
    })
})

module.exports = templateApiRouter