import { Db, MongoClient } from 'mongodb';

const password = 'hemant10';
//const url = `mongodb+srv://hemant10yadav:${password}@practice.woftxya.mongodb.net/?retryWrites=true&w=majority`;
const url = `mongodb://localhost:27017`;
let _db: Db;

const MongoConnect = (): Promise<boolean> => {
   return new Promise((resolve, reject) => {
      MongoClient.connect(url)
         .then((client: MongoClient) => {
            _db = client.db();
            resolve(true);
         })
         .catch((err) => {
            reject(err);
         });
   });
};

const getDb = () => {
   if (_db) {
      return _db;
   }
   throw new Error('Db not found');
};

export { MongoConnect, getDb };
