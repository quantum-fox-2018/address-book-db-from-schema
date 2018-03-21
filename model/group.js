"use strict"
const db = require('../config/database.js');

class Groups {
    constructor(option) {
        this.name = option.name;
    }

    static show(tableName, cbData) {
        let sql = `SELECT * FROM '${tableName}';`;

        db.all(sql, (err, data) => {
            if (err) {
                cbData(err.message, true)
            } else {
                cbData(data, false);
            }
        });
    }

    static save(name, cbGroup) {
        let group = new Groups({
            name: name
        });

        let queryGroup = `INSERT INTO Groups
                          VALUES (NULL, '${group.name}');`;

        db.run(queryGroup, (err) => {
            if (err) {
                cbGroup(err.message, true);
            } else {
                cbGroup(`${group.name} has added to the group`, false);
            }
        });
    }

    static update(value, id, cbUpdate) {
        db.all(`SELECT * FROM Groups WHERE id = ${id};`, (err, rows) => {
            if (rows.length === 0) {
                cbUpdate(`There is no contact with id ${id}`, true)
            } else {
                let queryUpdate = `UPDATE Groups
                                   SET name = '${value}'
                                   WHERE id = ${id};`;

                db.run(queryUpdate, (err) => {
                    if (err) {
                        cbUpdate(err.message, true);
                    } else {
                        cbUpdate(`The group name with id ${id} has been updated`, false);
                    }
                });
            }
        });
    }

    static delete(id, cbDelete) {
        db.all(`SELECT * FROM Groups WHERE id = ${id};`, (err, rows) => {
            if (rows.length === 0) {
                cbDelete(`There is no group with id ${id}`, true);
            } else {
                let queryDelete = `DELETE FROM Groups
                                   WHERE id = ${id};`;

                db.run(queryDelete, (err) => {
                    if (err) {
                        cbDelete(err.message, true);
                    } else {
                        cbDelete(`The group with id ${id} has been deleted`, false);
                    }
                });
            }
        });
    }

}

module.exports = Groups;