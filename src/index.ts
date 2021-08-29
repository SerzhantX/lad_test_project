import './config/environment';
import './passport';
import { server } from './config/server';
import { MongoConnect } from './config/mongo'

const mongoConnect = MongoConnect.init();

const port = global.process.env.EXPRESS_PORT;

mongoConnect.createConnection()
  .then(() => {
    server.listen(port, () => console.log(`start server on port ${port}`));
  });