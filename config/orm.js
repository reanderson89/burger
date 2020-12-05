const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

  // the query functions we will use in the burger.js model
let orm = {
  // selects all burgers from the db
    selectAll: function(tableInput,cb){
        let queryString = "SELECT * FROM "+tableInput+";";
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    // adds one burger to the db
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, res) {
          if (err) {
            throw err;
          }
    
          cb(res);
        });
    },
    // allows us to update the burger from devoured or not
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, res) {
          if (err) {
            throw err;
          }
    
          cb(res);
        });
},
// allows us to delete burgers from the db
deleteOne: function(table, condition, cb) {
  var queryString = "DELETE FROM " + table;
  queryString += " WHERE ";
  queryString += condition;

  connection.query(queryString, function(err, result) {
    if (err) {
      throw err;
    }

    cb(result);
  });
},
};

module.exports = orm;

