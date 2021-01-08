"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.dbName = process.env.dbName;
        this.client = new mongodb_1.MongoClient(process.env.mongodb, {
            useUnifiedTopology: true
        });
    }
    /**
     * connect
     *
     * connects to our mongodb database
     */
    connect() {
        return new Promise(resolve => {
            this.client.connect().then(() => {
                this.Users = this.client.db(this.dbName).collection('users');
                this.Characters = this.client.db(this.dbName).collection('characters');
                resolve(true);
            }, console.error);
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=db.js.map