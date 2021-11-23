
const express = require('express')
const path = require('path')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const loginApiRouter = require('./routes/api/login')
const userApiRouter = require('./routes/api/user')
const signoutApiRouter = require('./routes/api/signout')
const templateApiRouter = require('./routes/api/template')
const accountApiRouter = require('./routes/api/account')
const fbStorageApiRouter = require('./routes/api/fb-storage')
const settingApiRouter = require('./routes/api/setting')
const reportApiRouter = require('./routes/api/report')
const checkConnection = require('./middleware/check-connection')

require('dotenv').config()

app.prepare().then(() => {
    const server = express()

    server.use(express.json());
    server.use(express.urlencoded({
        extended: true
    }));

    server.use(cookieParser())

    server.use('/static', express.static(path.join(__dirname, 'public')))

    server.use(checkConnection)

    //api routes
    server.use(loginApiRouter)
    server.use(userApiRouter)
    server.use(signoutApiRouter)
    server.use(templateApiRouter)
    server.use(accountApiRouter)
    server.use(fbStorageApiRouter)
    server.use(settingApiRouter)
    server.use(reportApiRouter)

    server.get('/auth', (req, res) => {
        return app.render(req, res, '/auth', req.query)
    })

    server.get('/template', (req, res) => {
        return app.render(req, res, '/template', req.query)
    })

    server.get('/fb-storage', (req, res) => {
        return app.render(req, res, '/fb-storage', req.query)
    })

    server.get('/fb-storage/:id', (req, res) => {
        return app.render(req, res, '/fb-storage/[id].js', req.query)
    })

    server.get('/admin/account', (req, res) => {
        return app.render(req, res, '/admin/account', req.query)
    })

    server.get('/admin/setting', (req, res) => {
        return app.render(req, res, '/admin/setting', req.query)
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
