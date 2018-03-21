var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

class Group {
    constructor(name){
        this.name = name;
    }
    
    save(callback){
        let name = this.name;
        
        db.run(`INSERT INTO Groups VALUES(null,$name)`,{ $name:name }, function(err){
            if(err) {
                callback(err);
            } else {
                callback(`Group ${name} berhasil disimpan`);
            }
        });
    }

    static update(data, callback){
        let id = data[0];
        let name = data.slice(1).join(' ');

        db.run(`UPDATE Groups SET name=$name WHERE id=$id`,{$name:name, $id:id}, function(err){
            if(err) {
                callback(err)
            } else {
                callback(`Data Group dengan ID ${id} berhasil diubah!`)
            }
        })
    }

    static delete(id, callback){
        db.run(`DELETE FROM Groups WHERE id=$id`, { $id:id }, function(err){
            if(err){
                callback(err)
            } else {
                callback(`Data dengan ID ${id} berhasil terhapus!`)
            }
        })
    }
}

module.exports = Group;