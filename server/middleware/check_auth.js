const jwt = require('jsonwebtoken')
const config = require('../../config/dev')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, config.env.JWT_KEY)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        })
    }
}
