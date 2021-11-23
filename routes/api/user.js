const express = require('express')
const userApiRouter = express.Router()

const jwt = require('jsonwebtoken')
const checkAuth = require('../../middleware/check-auth')

//userApiRouter.use(checkAuth)

userApiRouter.get('/api/user', checkAuth, (req, res) => {
    const cookie = req.cookies
    const token = cookie['_token']

    if (!token || !req.user) {
        res.status(302).json({user:null})
    }
    else {
        res.status(200).json({user: req.user})
    }
})

module.exports = userApiRouter
