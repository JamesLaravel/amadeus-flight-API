const client = require('../helpers/_redis');

const redis_cache = (req, res, next) => {

    const { username } = req.params;

    client.get(username, (err, data) => {   
        if(err) throw err;

        if(data !== null){
            res.status(200).json({
                error: false,
                status:1, 
                message:  `${username} has ${data} Github public repos`
            })
        }else{
            next();
        }
    })
}

module.exports = redis_cache;