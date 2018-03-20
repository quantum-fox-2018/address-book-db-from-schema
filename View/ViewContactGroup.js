var Table = require('cli-table');

var table = new Table({
    head: ['ID', 'Group', 'Member'],
    colWidths: [5, 20, 20]
});

class ViewContactGroup {
  static listContactGroup(datas) {
    for(let i in datas) {
      table.push([datas[i].id, datas[i].group, datas[i].member]);
    }
    console.log(table.toString());
  }

  static addContactGroup(name) {
    console.log(`Data ${name} berhasil ditambahkan`);
  }

  static deleteContactGroup(name) {
    console.log(`Data ${name} berhasil di hapus`);
  }

  static updateContactGroup(name) {
    console.log(`Data ${name} berhasil di update`);
  }
}

module.exports = ViewContactGroup;
