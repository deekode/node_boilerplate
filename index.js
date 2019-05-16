require('custom-env').env(true)
const startServer = require('./app')

const isProduction =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

startServer({port: isProduction ? process.env.PORT : undefined})

