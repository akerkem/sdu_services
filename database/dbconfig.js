const oracledb = require('oracledb');

module.exports = function(query, parameters, callback){

  oracledb.getConnection(
    {
        user          : "hr",
        password      : "hr",
        connectString : "localhost/orcl"
    },

    function(err, connection) {

        if (err) {
            console.error(err.message);
            return;
        }
        
        sql =  query;
        binds = parameters;
        options = {
            outFormat: oracledb.OBJECT, 
            autoCommit:true,
            // extendedMetaData: true,   // get extra metadata
            fetchArraySize: 500          // internal buffer allocation size for tuning
        };
        result = connection.execute(sql, binds, options, function(err, results) {
        if (err) {
            console.log('Failed to query table in Oracle: '+ err);
            results = null;
            return callback(err)
        }
        connection.close();
        return callback(null, results);
        });
    });
};
