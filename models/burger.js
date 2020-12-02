const orm = require("../config/orm");

let burger = {
    select: function(){
        orm.selectAll
    },
    insert: function(){
        orm.insertOne
    },
    update: function(){
        orm.updateOne
    }
};

module.exports = burger;