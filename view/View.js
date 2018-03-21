const Table = require('cli-table')
const formatted = require('../forContactView.js')

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
      let newFormat = formatted(data)
      let contactsTable = new Table({
        head: ['ID','Name','Address','Phone Number','Email','Groups'],
        colWidths: [5,15,7,10,15,20]
      })
      for(let i=0; i<newFormat.length; i++){
        let contact = newFormat[i]
        contactsTable.push(
          [contact.id,contact.contactName,contact.address,contact.phoneNumber,contact.email,contact.groups]
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

  static insertData(status,input){
    if(status==false){
      let message = `Your phone number or email is not valid! phone number should contain number not greater than 12 digit, and your email format should like email in general`
      console.log(message)
    } else {
      console.log(`new Data of ${input} has saved!`)
    }
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
