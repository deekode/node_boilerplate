module.exports = {
    user: (req, res, next) => {
        try {
            if (req.user.role === 0) {
                next()
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'You are not a freelancer'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
