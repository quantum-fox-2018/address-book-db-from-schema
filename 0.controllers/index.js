const View = require('../0.views');
const Model = require('../0.models');
const ModelContacts = Model.ModelContacts;
const ModelGroups = Model.ModelGroups;
const ModelContactGroups = Model.ModelContactGroups;

class Controller {

    static routes(argv_data) {
        let command = argv_data[0];
        let input_data = argv_data.splice(1);

        switch(command) {
            case 'help': this.help(); break;
            case 'insertall': this.insertall(input_data); break;
            case 'insertone': this.insertone(input_data); break;
            case 'update': this.update(input_data); break;
            case 'delete': this.delete(input_data); break;
            case 'show': this.show(input_data); break;
            default: this.help();
        }
    }

    static help() {
        View.showHelp();
    }

    static insertall(input_data) {
        let tableName = input_data[0];
        let fileName = input_data[1];

        if (tableName.toLowerCase() == 'contacts' || fileName.toLowerCase() == 'contacts.csv') {
            ModelContacts.insertall();
            View.insertall(tableName);
        } else if (tableName.toLowerCase() == 'groups' || fileName.toLowerCase() == 'groups.csv') {
            ModelGroups.insertall();
            View.insertall(tableName);
        } else if (tableName.toLowerCase() == 'contactgroups' || fileName.toLowerCase() == 'contact-groups.csv') {
            ModelContactGroups.insertall();
            View.insertall(tableName);
        }
    }

    static insertone(input_data) {
        let tableName = input_data[0];
        let data = input_data.splice(1); // array

        if (tableName.toLowerCase() == 'contacts') {
            ModelContacts.insertone(data);
            View.insertone(tableName);
        } else if (tableName.toLowerCase() == 'groups') {
            ModelGroups.insertone(data);
            View.insertone(tableName);
        } else if (tableName.toLowerCase() == 'contactgroups') {
            ModelContactGroups.insertone(data);
            View.insertone(tableName);
        }
    }

    static update(input_data) {
        let tableName = input_data[0];
        let data = input_data.splice(1); // array
      
        if (tableName.toLowerCase() == 'contacts') {
            ModelContacts.update(data);
            View.update(tableName);
        } else if (tableName.toLowerCase() == 'groups') {
            ModelGroups.update(data);
            View.update(tableName);
        } else if (tableName.toLowerCase() == 'contactgroups') {
            ModelContactGroups.update(data);
            View.update(tableName);
        }
    }

    static delete(input_data) {
        let tableName = input_data[0];
        let data = input_data[1];

        if (tableName.toLowerCase() == 'contacts') {
            ModelContacts.delete(data);
            View.delete(tableName);
        } else if (tableName.toLowerCase() == 'groups') {
            ModelGroups.delete(data);
            View.delete(tableName);
        } else if (tableName.toLowerCase() == 'contactgroups') {
            ModelContactGroups.delete(data);
            View.delete(tableName);
        }
    }

    static show(input_data) {
        let tableName = input_data[0];

        if (tableName.toLowerCase() == 'contacts') {
            ModelContacts.show(function(arrObjContacts) {
                View.show(arrObjContacts);
            });
        } else if (tableName.toLowerCase() == 'groups') {
            ModelGroups.show(function(arrObjContacts) {
                View.show(arrObjContacts);
            });
        } else if (tableName.toLowerCase() == 'contactgroups') {

        }


    }
    



}


module.exports = Controller;