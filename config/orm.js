const connection = require("../config/connection.js");

let orm = {
    selectAll: function(tableInput,cb){
        let queryString = "SELECT * FROM "+tableInput+";";
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: function(){},
    updateOne: function(){}
};

module.exports = orm;

