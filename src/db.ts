import { Collection, MongoClient } from 'mongodb'

class Database {
  public client:MongoClient;
  public dbName:string = process.env.dbName;

  public Users:Collection<any>;
  public Characters:Collection<any>;

  constructor() {
    this.client = new MongoClient(process.env.mongodb, {
      useUnifiedTopology: true
    });

    this.Users = this.client.db(this.dbName).collection('users');
    this.Characters = this.client.db(this.dbName).collection('characters');
  }

  /**
   * connect
   * 
   * connects to our mongodb database
   */
  public connect() {
    return this.client.connect();
  }
}

export default new Database();