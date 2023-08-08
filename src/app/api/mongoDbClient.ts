import 'server-only';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri: string  = process.env.MONGODB_KEY!;
const dbname: string = process.env.MONGODB_DB! + process.env.ENV!;

// export { ObjectId };

export const mongoDbClient: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const todoListCollection = mongoDbClient.db(dbname).collection('todoList');
