const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')

const signToken = async user => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.username,
        balance: user.balance,
        provider: user.provider
    }
    // Sign Token
    return jwt.sign(payload, keys.secretOrKey, {expiresIn: 604800})
}

module.exports = {signToken}
