const axios = require('axios');
const client = require('../helpers/_redis');

const setResponse = (username, repos) => {
    //set response
    return `${username} has ${repos} Github public repos`
}


exports.getRepos = async (req, res, next) => {

    try {
        
        const { username } = req.params;

        await axios.get(`https://api.github.com/users/${username}`)
                    .then((response)=> {
                        const data = response.data;
                        const repos = data.public_repos;
                        
                        client.setex(username, 180, repos);
                        
                        res.status(200).json({
                            error:false,
                            status:1,
                            message:  `${username} has ${repos} Github public repos`
                        });
                        
                    }).catch((err)=> {
                        err.status = 400;
                        next(err);
                    })

        
    } catch (error) {
        error.status = 400;
        next(error);
    }
}