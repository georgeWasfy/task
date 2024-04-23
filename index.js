const config                = require('./config/index.config.js');
const Cortex                = require('ion-cortex');
const ManagersLoader        = require('./loaders/ManagersLoader.js');

const mongoDB = config.dotEnv.MONGO_URI? require('./connect/mongo.js')({
    uri: config.dotEnv.MONGO_URI
}):null;

const cache = null

const cortex = null



const managersLoader = new ManagersLoader({config, cache, cortex});
const managers = managersLoader.load();

managers.userServer.run();
