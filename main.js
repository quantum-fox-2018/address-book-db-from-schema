const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')
const Controller = require('./controllers/controller.js')

const argv = process.argv

function command(inputCommand,inputTable,inputData){
  if(inputCommand==='insert'){
    Controller.insertData(inputTable,inputData)
  }
  else if(inputCommand==='update'){
    Controller.updateData(inputTable,inputData)
  }
  else if(inputCommand==='delete'){
    Controller.deleteData(inputTable,inputData)
  }
  else if(inputCommand==='show'){
    if(inputData.length===0){
      Controller.readAllData(inputTable)
    }
    else{
      Controller.readData(inputTable,inputData)
    }
  }
  else if(inputCommand==='assign'){
    Controller.assignData(inputData)
  }

  else if(inputCommand==='help'){
    Controller.help()
  }

}


command(argv[2],argv[3],argv.slice(4))


db.close();
