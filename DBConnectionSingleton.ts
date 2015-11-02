///<reference path='node.d.ts'/>
'use strict'
var couchbase = require('couchbase');

class DBConnectionSingleton {
    private static instance:DBConnectionSingleton;
    private cluster;
    private bucket;

    constructor() {
        if (DBConnectionSingleton.instance) {
            return DBConnectionSingleton.instance;
        }
        this.cluster = new couchbase.Cluster('localhost:8091');
        this.bucket = this.cluster.openBucket('SocialNetwork');
        DBConnectionSingleton.instance = this;
    }


    public getBucket() {
        return this.bucket;
    }

}
new DBConnectionSingleton();
export=DBConnectionSingleton;