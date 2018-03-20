const Table = require('cli-table')

class View {
  static ifUndefined(){
    console.log(`type 'node main.js help' for help`)
  }

  static help(){
    console.log(`type 'node main.js read <content>'
      to see table of content`)
    console.log(`type 'node main.js insert <content> <content_data>'
      to insert data into content`)
    console.log(`type 'node app.js update <content> <content_id>
      <content_column_name> <content_column_data>'
      to replace/update data of content with new data`)
    console.log(`type 'node app.js assign <contactName> to <groupName>'
      to assign a contact to group`)
  }

  static readData(type,data){
    if(type=='contacts' || type=='contact'){
      let contactsTable = new Table({
        head: ['ID','Name','Address','Phone Number','Email'],
        colWidths: [5,15,10,15,25]
      })
      for(let i=0; i<data.length; i++){
        let contact = data[i]
        contactsTable.push(
          [contact.id,contact.name,contact.address,contact.phoneNumber,contact.email]
        )
      }
      console.log(contactsTable.toString())
    } else if(type=='group' || type=='groups'){
      let groupsTable = new Table({
        head: ['ID','Group Name'],
        colWidths: [5,25]
      })
      for(let i=0; i<data.length; i++){
        let group = data[i]
        groupsTable.push(
          [group.id,group.name]
        )
      }
      console.log(groupsTable.toString())
    }
  }

  static insertData(input){
    console.log(`new Data of ${input} has saved!`)
  }

  static updateData(input,position){
    console.log(`Data of ${input} at ID: ${position} has updated!`)
  }

  static deleteData(input,position){
    console.log(`Data of ${input} at ID: ${position} has deleted!`)
  }

  static assign(contactName,groupName){
    console.log(`${contactName} has assigned to ${groupName}`)
  }
}

module.exports = View
