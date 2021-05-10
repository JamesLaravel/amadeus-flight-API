const index = require('./index');
const ninja = require('./ninja');
const users = require('./user');
const todo = require('./todo');
const api = require('./api');


const useRouter = (app) => {

    const routeDefinitions = [
        index,
        ninja,
        users,
        todo,
        api,
    ];

    for(let i = 0; i < routeDefinitions.length; i += 1){
        const router = routeDefinitions[i]; 
        app.use('/api/v1', router);
    }
};

module.exports = useRouter;