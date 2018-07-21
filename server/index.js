var express = require('express')
var bp = require('body-parser')
var cors = require('cors')
var server = express()
var session = require('./auth/session')
var port = process.env.PORT || 3000
require('./db/mlab-config')
var authRoutes = require('./auth/routes')
var apiRoutes = require('./api_routes/apiRoutes')


var whitelist = ['http://localhost:8080', '//brewbros.herokuapp.com']
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
}

server.use(cors(corsOptions))
server.use(session)
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/../public/dist'))

server.use(authRoutes)
server.use(apiRoutes.router)


server.use('/api/*', (req, res, next) => {
    if (req.method.toLowerCase() !== 'get' && !req.session.uid) {
        return res.status(401).send({ error: 'PLEASE LOGIN TO CONTINUE' })
    }
    next()
})

server.use('*', (err, req, res, next) => {
    res.status(400).send(err)
})

server.listen(port, () => {
    console.log('Server running on port: ', port)
})