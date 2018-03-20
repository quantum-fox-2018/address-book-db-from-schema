const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class Group {

    static insertall() {
        const db = new sqlite3.Database('./group1.db', (err) => {
            if (err) {
              return console.error('Connect',err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        
        db.serialize(function() {
            let pathFileName = '../address-book-db-from-schema/0.seed-data/groups.csv';
            
            let raw_data = fs.readFileSync(pathFileName, 'utf8').trim().split('\r\n');
            let table_data = [];
            for (let i = 1; i < raw_data.length; i++) {
                table_data.push(raw_data[i].split(','));
            }
    
            let maxColumn = [];
            for (let i = 0; i < table_data[0].length; i++) {
                maxColumn.push('?');
            }
            let joinMaxColumn = maxColumn.join(',');

            var stmt = db.prepare(`INSERT INTO Groups VALUES (null,${joinMaxColumn})`);
            
            for (var i = 0; i < table_data.length; i++) {
                stmt.run(table_data[i]);
            }
            stmt.finalize();
           
            db.close((err) => {
            if (err) {
            return console.error('Close',err.message);
            }
            console.log('Close the database connection.');
            });
        })
    }

    static update(data) {

        const db = new sqlite3.Database('./group1.db', (err) => {
            if (err) {
              return console.error('Connect',err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
        
        db.serialize(function() {
            
            let columnToUpdate = data[0];
            let updateData = data[1];
            let id = data[2];

            db.run(`UPDATE Groups SET ${columnToUpdate} = '${updateData}' WHERE Groups.groupId = ${id}`)
           
            db.close((err) => {
            if (err) {
            return console.error('Close',err.message);
            }
            console.log('Close the database connection.');
            });
        })
    }

    static delete(id) {
        const db = new sqlite3.Database('./group1.db');
        
        db.serialize(function() {     
            db.run(`DELETE FROM ContactGroups WHERE ContactGroups.groupId = ${id}`)
            db.run(`DELETE FROM Groups WHERE Groups.groupId = ${id}`)
            db.close();
        })
    }


    static show(cb) {
        const db = new sqlite3.Database('./group1.db');
        
        db.serialize(function() {     
            let query = `SELECT Groups.groupId, Groups.name AS GroupName, Contacts.first_name || " "|| Contacts.last_name AS FullName
            FROM Groups
            LEFT JOIN ContactGroups ON Groups.groupId = ContactGroups.groupId
            LEFT JOIN Contacts ON ContactGroups.contactId = Contacts.contactId;`;
            
            db.all(query, function(err, arrObjContacs) {
                cb(arrObjContacs)
            });

            db.close();
        })
    }


    static insertone(data) {
        const db = new sqlite3.Database('./group1.db');
        db.serialize(function() {     
            let name = data[0];
      
            db.run(`INSERT INTO Groups VALUES (null,'${name}')`)
    
            db.close();
        })
    }

}







module.exports = Group;