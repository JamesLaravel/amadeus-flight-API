module.exports = function getHeader(req, res, next) {

   
    let header = req.header('token')

    if(header != 1233){
        res.status(401).send({
            'message':'unauthorized client'
        })
    }
    
    req.client = "client";
    next()
}