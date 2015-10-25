///<reference path='node.d.ts'/>
'use strict';
var couchbase = require('couchbase');
var DBConnectionSingleton = (function () {
    function DBConnectionSingleton() {
        if (DBConnectionSingleton.instance) {
            return DBConnectionSingleton.instance;
        }
        this.cluster = couchbase.Cluster('localhost:8091');
        this.bucket = this.cluster.getBucket('');
        DBConnectionSingleton.instance = this;
    }
    DBConnectionSingleton.prototype.getBucket = function () {
        return this.bucket;
    };
    return DBConnectionSingleton;
})();
module.exports = DBConnectionSingleton;
//# sourceMappingURL=DBConnectionSingleton.js.map