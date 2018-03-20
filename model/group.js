const Method = require('../setup.js');
const db = Method.db;

class Groups{
    static getAllGroups(callback){
        db.all(`SELECT * FROM Groups`, function(err, groupData){
            if(err){
                callback(err);
            }else{
                if(groupData.length == 0){
                    callback(`There is currently no group made!`);
                }else{
                    callback(groupData);
                }
            }
        })
    }

    static addGroup(groupName, callback){
        db.run(`INSERT INTO Groups VALUES(NULL, ?)`, groupName, function(err){
            if(err){
                callback(err);
            }else{
                callback(`${groupName} has been created!`);
            }
        });
    }

    static dropGroup(callback){
        db.run(`DROP TABLE IF EXISTS Groups`, function(err){
            if(err){
                callback(err);
            }else{
                callback(`Table Groups has been dropped!`);
            }
        })
    }

    static deleteGroup(groupName ,callback){
        db.run(`DELETE FROM Groups WHERE group_name = ?`, groupName, function(err){
            if(err){
                callback(err);
            }else{
                callback(`Group ${groupName} has been deleted!`);
            }
        })
    }

    static UpdateGroup(id, groupName, callback){
        db.run(`UPDATE Groups SET group_name = ? WHERE id = ?`, groupName, id, function(){
            if(err){
                callback(err);
            }else{
                callback(`Group has been updated!`);
            }
        })
    }
}

module.exports = Groups;