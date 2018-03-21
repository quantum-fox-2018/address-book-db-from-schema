const Contact = require('../models/contact.js');
const Group = require('../models/group.js');
const GroupContact = require('../models/group-contact.js');

const ViewContact = require('../views/contact');
const ViewGroup = require('../views/group');
// const ViewGroup = require('../views/group');

class ControllerContact {
    static add(data){
        let fname = data[0];
        let lname = data[1];
        let email = data[2];
        let telp = data[3];

        let contact = new Contact(fname,lname,email,telp)
        contact.save(function(reportNotif){
            ViewContact.notifAdd(reportNotif)
        });
        
    }

    static edit(data){
        Contact.update(data, function(reportUpdate){
            ViewContact.notifUpdate(reportUpdate)
        })
    }
    
    static delete(id){
        Contact.delete(id, function(reportDelete){
            ViewContact.notifDelete(reportDelete)
        })
    }

    static show(){
        Contact.show(function(data){
            ViewContact.show(data)
            // console.log(data)
        })
    }
    
}

class ControllerGroup {
    static add(data){
        let name = data.slice(0).join(' ');

        let group = new Group(name);
        group.save(function(reportAdd){
            ViewGroup.notifAdd(reportAdd)
        })
    }

    static edit(data){
        Group.update(data, function(reportUpdate){
            ViewGroup.notifUpdate(reportUpdate)
        })
    }

    static delete(id){
        Group.delete(id, function(reportDelete){
            ViewGroup.notifDelete(reportDelete)
        })
    }
}

class ControllerGroupContact {
    static add(data){
        let groupId = data[0];
        let contactId = data[1];

        let groupContact = new GroupContact(groupId, contactId);
        groupContact.save(function(reportAdd){
            console.log(reportAdd)
        })
        // console.log(data)
    }
}

module.exports = {ControllerContact,ControllerGroup,ControllerGroupContact};