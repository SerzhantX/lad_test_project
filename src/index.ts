import './config/environment';
import { server } from './config/server';

const port = global.process.env.PORT;

server.listen(port, () => console.log(`start server on port ${port}`));