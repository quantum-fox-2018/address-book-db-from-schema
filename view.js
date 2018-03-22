var Table = require('cli-table2');


class View {
  static contact(data){
    // console.log(data);
    let table = new Table({
        head: ['Id', 'Name', 'Company', 'Phone', 'Email']
      , colWidths: [5, 20]
    });
    for(let i=0; i<data.length; i++){
      let indexData = data[i]
      table.push([indexData.id, indexData.name, indexData.company, indexData.phone, indexData.email])
    }
    console.log(table.toString());
  }

  static saveContact(err){
    if(err){
      console.log('add contact failed', err);
    }else{
      console.log('add contact success');
    }
  }

  static editContact(err){
    if(err){
      console.log(err);
    }else{
      console.log('Update contact success');
    }
  }

  static deleteContact(err){
    if(err){
      console.log(`Can't delete Contact, ${err}`);
    }else{
      console.log('Delete contact success');
    }
  }

///////////

  static listGroup(data){
    // console.log(data);
    let table = new Table({
        head: ['Id', 'Group Name']
      , colWidths: [5, 20]
    });
    for(let i=0; i<data.length; i++){
      let indexData = data[i]
      table.push([indexData.id, indexData.group_name])
    }
    console.log(table.toString());
  }

  static saveGroup(err){
    if(err){
      console.log('add group failed', err);
    }else{
      console.log('add group success');
    }
  }

  static editGroup(err){
    if(err){
      console.log(err);
    }else{
      console.log('Update group success');
    }
  }

  static deleteGroup(err){
    if(err){
      console.log(`Can't delete Group, ${err}`);
    }else{
      console.log('Delete group success');
    }
  }

///////////////////////////

  static readContactGroup(data){
    let table = new Table({
        head: ['No', 'Name', 'Phone', 'Company', 'Email']
      , colWidths: [5, 20]
    });
    for(let i=0; i<data.length; i++){
      let indexData = data[i]
      table.push([i+1, indexData.name, indexData.phone, indexData.company, indexData.email])
    }
    console.log(table.toString());
  }

  static addContactGroup(err){
    if(err){
      console.log(`Can't add contact to group : ${err}`);
    }else{
      console.log(`add Contact to Group success`);
    }
  }

  static deleteContactGroup(err){
    if(err){
      console.log(`Can't delete contact : ${err}`);
    }else{
      console.log('Contact has been delete');
    }
  }

}


module.exports = View;
