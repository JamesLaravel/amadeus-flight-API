const index = require('./index');
const ninja = require('./ninja');
const users = require('./user');
const todo = require('./todo');
const api = require('./api');
const notes = require('./note');


const useRouter = (app) => {

    const routeDefinitions = [
        index,
        ninja,
        users,
        todo,
        api,
        notes,
    ];

    for(let i = 0; i < routeDefinitions.length; i += 1){
        const router = routeDefinitions[i]; 
        app.use('/api/v1', router);
    }
};

module.exports = useRouter;