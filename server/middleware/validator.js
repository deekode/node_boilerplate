const Joi = require('joi')

module.exports = {
    validateBody: schema => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema)
            if (result.error) {
                const message = result.error.details[0].message
                    .replace('"', '')
                    .replace('"', '')
                return res.status(400).json({errors: message})
            }
            if (!req.value) {
                req.value = {}
            }
            req.value['body'] = result.value
            next()
        }
    },
    schemas: {
        signupSchema: Joi.object().keys({
            name: Joi.string()
                .min(3)
                .max(30)
                .required()
                .label('Name'),
            username: Joi.string()
                .min(3)
                .max(30)
                .required()
                .label('Username'),
            email: Joi.string()
                .email({minDomainAtoms: 2})
                .required()
                .label('Email'),
            password: Joi.string()
                .min(6)
                .required()
                .label('Password'),
            role: Joi.number()
                .required()
                .label('Role'),
            referal_id: Joi.allow()
        })
    }
}
