const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];

        if(token){

            try {
                const user = jwt.verify(token, process.env.JWTSECRET_KEY) 
                req.user = user;
                return next();
            } catch (error) {
                error.message = 'Invalid token';
            }
        }

        error.message = 'Invalid token';
        return next(error);
    }
    error.message = 'Unauthorized';
    return next(error);
}
