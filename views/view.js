const Table = require('cli-table');

class View {
  static help() {
    let table = new Table({
      head: ['Command', 'Function']
    });
    
    table.push(
        ['Help', 'Information'],
        ['Add:Contact <name> <company> <phone> <email>', 'Create new contact'],
        ['Update:Contact <id_group> <key> <value>', 'Update contact'],
        ['Delete:Contact <id_contact>', 'Delete contact'],
        ['Show:Contact', 'Show all contact'],
        ['Assign:Group <id_contact> <id_group>', 'Assign contact to Group'],
        ['Add:Group <name>', 'Create new group'],
        ['Update:Group <id_group> <key> <value>', 'Update group'],
        ['Delete:Group <id_group>', 'Delete group'],
        ['Show:Group', 'Show all group'],
    );
    
    console.log(table.toString());
  }
  
  static printLine(text) {
    console.log(text)
  }

  static show(data) {
    let keys = Object.keys(data[0])
    
    let table = new Table({
      head: keys
    })

    for(let i=0; i<data.length; i++) {
      let value = Object.values(data[i])
      table.push(value)
    }

    console.log(table.toString());
  }
}

module.exports = View