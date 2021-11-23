const express = require('express')
const signoutApiRouter = express.Router()

signoutApiRouter.get('/api/auth/signout', (req, res)=>{
    res.clearCookie('_token')
    res.writeHead(302, { Location: '/' })
    res.end() 
})

module.exports = signoutApiRouter
