const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];

        if(token){

            try {
                const { user, exp } = jwt.verify(token, process.env.JWTSECRET_KEY) 

                if(Date.now() >= exp * 1000){
                    error.status = 400;
                    error.message = 'Token time out. Login again'
                    return next(error);
                }

                req.user = user;

                return next();
            } catch (error) {

                if(error.message == "jwt expired"){
                    error.message = 'Token time out. Login again'                    
                }

                error.status = 400;
                return next(error);
            }
        }

        error.message = 'Invalid token';
        return next(error);
    }
    error.message = 'Unauthorized';
    return next(error);
}
