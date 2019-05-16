if (process.env.NODE_ENV === 'test') {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/test',
        secretOrKey: 'secret',
        mail: {
            user: 'y@5e01@@@',
            pass: 'info@yase.io'
        },
        domainName: 'http://localhost:3000'
    }
} else {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        secretOrKey: process.env.secretOrKey,
        mail: {
            user: process.env.mailuser,
            pass: process.env.mailpass
        },
        domainName: process.env.domainName
    }
}
