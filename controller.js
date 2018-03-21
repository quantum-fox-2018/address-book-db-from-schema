"use strict"
const Contact = require('./model/contact.js');
const Group = require('./model/group.js');
const View = require('./view.js');

class Controller {
    static showData(tableName) {
        switch (tableName) {
            case 'Contacts':
            Contact.show(tableName, (data, err) => {
                if (err) {
                    View.showErrorMessage(data); // data error
                } else {
                    View.showMessage(data); // data table
                }
            });
            break;
            case 'Groups':
            Group.show(tableName, (data, err) => {
                if (err) {
                    View.showErrorMessage(data); // data error
                } else {
                    View.showMessage(data); // data table
                }
            });
            break;
        }
    }

    static saveContact(name, email, phone) {
        Contact.save(name, email, phone, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }

    static updateContact(column, value, id) {
        Contact.update(column, value, id, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }

    static deleteContact(id) {
        Contact.delete(id, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }

    static saveGroup(name) {
        Group.save(name, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }

    static updateGroup(value, id) {
        Group.update(value, id, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }

    static deleteGroup(id) {
        Group.delete(id, (statusMessage, err) => {
            if (err) {
                View.showErrorMessage(statusMessage);
            } else {
                View.showMessage(statusMessage);
            }
        });
    }
}

module.exports = Controller;