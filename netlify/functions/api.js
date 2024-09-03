import express, { Router } from 'express';
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
const DEV = process.env.DEVELOPMENT;
// * Code
const api = express();
const router = Router();
api.use(express.json());
api.use(cors());
// * Connect to DB
mongoose.connect(
  'mongodb+srv://shmone800:8rQXloHl21CdN6mI@itsemit.fde0uzz.mongodb.net/?retryWrites=true&w=majority',
  {
    dbName: 'my-project',
  }
);
// Success
mongoose.connection.on('connected', () => console.log('Connected to DB !'));
// Failed
mongoose.connection.on('error', (e) =>
  console.log(`Connected to DB failed: ${e}`)
);
router.get('/hello', (_, response) => {
  response.send('hello)))');
});
api.use('/api/', router);
// * Server (local)
DEV && api.listen(3000, () => console.log('Server is running'));
export const handler = serverless(api);
