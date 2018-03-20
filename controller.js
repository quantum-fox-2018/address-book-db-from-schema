const View = require('./view.js');
const Contact = require('./model/contact.js');
const Group = require('./model/group.js');
const group_contact = require('./model/group_contact.js');

class Controller{
    static contactManip(input){
        if(input[0] == 'showContacts'){
            Contact.getAllContacts(function(contactData){
                View.showData(contactData);
            });
        }else if(input[0] == 'add'){
            let name = input[1];
            let phone = input[2];
            Contact.addContact(name, phone, function(message){
                View.showConfirmation(message);
            });
        }else if(input[0] == 'drop'){
            Contact.dropTable(function(message){
                View.showConfirmation(message);
            });
        }else if(input[0] == 'delete'){
            let id = input[1];
            group_contact.getLength(function(length){
                if(length == 0){
                    Contact.deleteContact(id, function(message){
                        View.showConfirmation(message);
                    });
                }else{
                    Contact.deleteContact(id, function(message){
                        View.showConfirmation(message);
                    });
                    group_contact.deleteConjuncContact(id, function(){
                        View.showConfirmation(message);
                    });
                }
            })
        }else if(input[0] == 'update'){
            let id = input[1];
            let name = input[2];
            Contact.updateContact(id, name, function(message){
                View.showConfirmation(message);
            })
        }else if(input[0] == 'showAll'){
            let name = input[1];
            Contact.showAll(name, function(data){
                View.showData(data);
            });
        }
    }

    static groupManip(input){

        if(input[0] == 'showGroups'){
            let groupName = input[1];
            Group.getAllGroups(function(groupData){
                View.showData(groupData);
            })
        }else if(input[0] == 'add'){
            let groupName = input[1];
            Group.addGroup(groupName, function(message){
                View.showConfirmation(message);
            })
        }else if(input[0] == 'drop'){
            Group.dropGroup(function(message){
                View.showConfirmation(message);
            })
        }else if(input[0] == 'delete'){
            let id = input[1];

            group_contact.getLength(function(length){
                if(length == 0){
                    Group.deleteGroup(groupName, function(message){
                        View.showConfirmation(message);
                    })
                }else{
                    Group.deleteGroup(groupName, function(message){
                        View.showConfirmation(message);
                    })
                    group_contact.deleteConjuncGroup(id, function(message){
                        View.showConfirmation(message);
                    })
                }
            })
        }else if(input[0] == 'update'){
            Group.updateContact(id, groupName, function(message){
                View.showConfirmation(message);
            })
        }
        else if(input[0] == 'join'){
            let name = input[1];
            let groupName = input[2];

            group_contact.joinGroup(name, groupName, function(message){
                View.showConfirmation(message);
            })
        }
    }

    static deleteConnectionGroup(groupId){
        group_contact.dropGroupContact(function(message){
            View.showConfirmation(message)
        });
    }
}

module.exports = Controller;