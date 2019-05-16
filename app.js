const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const database = require('./config/keys').mongoURI
const passport = require('passport')
const detectPort = require('detect-port')
const cors = require('cors')

async function startServer({port}) {
    mongoose.Promise = global.Promise

    port = port || (await detectPort())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(passport.initialize())
    app.use(morgan('dev'))

    app.get('/', function(req, res) {
        res.send({Hello: 'Yase Backend here'})
    })

    // Passport Config
    require('./config/passport')(passport)

    // Routes
    require('./server/routes')(app)

    // custom error handling
    app.use((req, res, next) => {
        const error = new Error('Not found')
        error.status = 404
        next(error)
    })

    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        })
    })

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            console.log(`Listening on port ${server.address().port}`)
            const originalClose = server.close.bind(server)
            server.close = () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose)
                })
            }
            mongoose.connect(database, {useNewUrlParser: true}, (err, any) => {
                server.db = {
                    drop: () => {
                        return new Promise(resolve => {
                            any.dropDatabase(function(err, result) {
                                console.log('Error : ' + err)
                                if (err) throw err
                                any.close()
                                resolve('Operation Success ? ' + result)
                            })
                        })
                    }
                }
                console.log(`${any.db.databaseName} ${any.host} activated!`)
                resolve(server)
            })
        })
    })
}

module.exports = startServer
