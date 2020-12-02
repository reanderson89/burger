const orm = require("../config/orm");

let burger = {
    select: function(cb) {
        orm.selectAll("burgers", function(res) {
          cb(res);
        });
    },
    insert: function(){
        orm.insertOne
    },
    update: function(){
        orm.updateOne
    }
};

module.exports = burger;