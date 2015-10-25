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
        this.cluster = couchbase.Cluster('localhost:8091');
        this.bucket = this.cluster.getBucket('');
        DBConnectionSingleton.instance = this;
    }


    public getBucket() {
        return this.bucket;
    }

}
export=DBConnectionSingleton;