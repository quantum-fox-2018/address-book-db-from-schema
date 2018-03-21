const Table = require('cli-table')

class HelpView{
  static displayHelp(dataHelps){
    console.log(`NO| COMMAND | INFORMATION`)
    for(let i=0; i<dataHelps.length; i++){
      console.log(`${dataHelps[i].id} | ${dataHelps[i].command} | ${dataHelps[i].information}` )
    }

  }
}

module.exports = HelpView
