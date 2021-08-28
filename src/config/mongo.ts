import mongoose, { ConnectOptions } from 'mongoose';

const typeEnv = global.process.env.TYPE_ENV;

const MONGO_HOST = (typeEnv === 'docker') ? global.process.env.MONGO_NAME : global.process.env.MONGO_HOST;
const MONGO_PORT = global.process.env.MONGO_PORT;
const MONGO_DB = global.process.env.MONGO_DB;

const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}


export class MongoConnect {

  private readonly mongoUrl: string;
  private readonly mongoOptions: ConnectOptions;

  private static mongoConnection: MongoConnect;

  private constructor(mongoUrl: string = MONGO_URL, mongoOptions: ConnectOptions = MONGO_OPTIONS) {
    this.mongoUrl = mongoUrl;
    this.mongoOptions = mongoOptions;
  }

  public static init(): MongoConnect {
    if (!MongoConnect.mongoConnection) {
      MongoConnect.mongoConnection = new MongoConnect();
    }

    return this.mongoConnection;
  }

  public async createConnection(): Promise<void> {
    await mongoose.connect(this.mongoUrl, this.mongoOptions);
  }

}