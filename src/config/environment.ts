import dotenv from 'dotenv';

if (global.process.env.PORT === undefined) {
  dotenv.config({ path: 'environment/.env' });
}