var Table = require('cli-table');

var table = new Table({
    head: ['ID', 'Group Name'],
    colWidths: [5, 22]
});

class ViewGroup {
  static listGroup(datas) {
    for(let i in datas) {
      table.push([datas[i].id, datas[i].name]);
    }
    console.log(table.toString());
  }

  static addGroup(name) {
    console.log(`Data ${name} berhasil ditambahkan`);
  }

  static deleteGroup(name) {
    console.log(`Data ${name} berhasil di hapus`);
  }

  static updateGroup(name) {
    console.log(`Data ${name} berhasil di update`);
  }
}

module.exports = ViewGroup;
