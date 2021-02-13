const Contact = require('./contact.js')
const Group = require('./group.js')
const ContactGroup = require('./contact-group.js')

class Model{
  constructor(){}

  static insertData(inputTable,inputData,callback){
    if(inputTable==='contacts'){
      let contact = new Contact(inputData[0],inputData[1])
      contact.save(callback)
    }
    else if(inputTable==='groups'){
      let group = new Group(inputData[0])
      group.save(callback)
    }
    else if(inputTable==='contacts-groups'){
      let contact_group = new ContactGroup(inputData[0],inputData[1])
      contact_group.save(callback)
    }
  }

  static updateData(inputTable,inputData,callback){
    if(inputTable==='contacts'){
      let contact = new Contact(inputData[0],inputData[1])
      contact.update(inputData[2],callback)
    }
    else if(inputTable==='groups'){
      let group = new Group(inputData[0])
      group.update(inputData[1],callback)
    }
    else if(inputTable==='contacts-groups'){
      let contact_group = new ContactGroup(inputData[0],inputData[1])
      contact_group.update(inputData[2],callback)
    }
  }

  static deleteData(inputTable,inputData,callback){
    if(inputTable==='contacts'){
      let contact = new Contact()
      contact.destroy(inputData[0],callback)
    }
    else if(inputTable==='groups'){
      let group = new Group()
      group.destroy(inputData[0],callback)
    }
    else if(inputTable==='contacts-groups'){
      let contact_group = new ContactGroup()
      contact_group.destroy(inputData[0],callback)
    }
  }

  static readAllData(inputTable,callback){
    if(inputTable==='contacts'){
      let contact = new Contact()
      contact.showAll(callback)
    }
    else if(inputTable==='groups'){
      let group = new Group()
      group.showAll(callback)
    }
    else if(inputTable==='contacts-groups'){
      let contact_group = new ContactGroup()
      contact_group.showAll(callback)
    }
  }

  static readData(inputTable,inputData,callback){
    if(inputTable==='contacts'){
      let contact = new Contact()
      contact.show(inputData[0],callback)
    }
    else if(inputTable==='groups'){
      let group = new Group()
      group.show(inputData[0],callback)
    }
    else if(inputTable==='contacts-groups'){
      let contact_group = new ContactGroup()
      contact_group.show(inputData[0],callback)
    }
  }

  static assignData(inputTable,inputData,callback){
    let contact_group = new ContactGroup()
    contact_group.assign(inputTable,inputData[0],callback)
  }

  static help() {
  let arrCommand = ['node main.js help', 'node main.js insert <contacts/groups> <data_content>',
  'node main.js update <contacts/groups> <data_content> <data_id>',
  'node main.js delete <data_id>', 'node main.js show <contacts/groups>','node main.js show <contacts/groups> <data_id>',
  'node main.js assign <contact_name> <group_name>']
  return arrCommand
  }

}


module.exports = Model
