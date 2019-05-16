const {validateBody, schemas} = require('../../middleware/validator')
const passport = require('passport')

module.exports = app => {
    app.post('/auth/register', validateBody(schemas.signupSchema))
    app.get('/auth/token_auth/:token')
    app.get('/auth/get_token', passport.authenticate('jwt', {session: false}))
    app.post('/auth/resend_token', validateBody(schemas.emailSchema))
    app.post('/auth/login', validateBody(schemas.loginSchema))

    app.post('/auth/forgot_password', validateBody(schemas.emailSchema))
    app.post(
        '/auth/reset_password/:token',
        validateBody(schemas.passwordSchema)
    )
    app.post(
        '/auth/change_passwword',
        passport.authenticate('jwt', {session: false}),
        validateBody(schemas.changePasswordSchema)
    )
}
