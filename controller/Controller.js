const Model = require('../model/Model.js');
const View = require('../view/View.js');

class Controller {
  constructor(command,content) {
    this.command = command
    this.content = content
  }

  execute(){
    if(this.command==undefined){
      View.ifUndefined()
    } else if(this.command=='help'){
      View.help()
    } else if(this.command=='read'){
      Model.readData(this.content,(type,data)=>{
        View.readData(type,data)
      })
    } else if(this.command=='insert'){
      Model.insertData(this.content,(input)=>{
        View.insertData(input)
      })
    } else if(this.command=='update'){
      Model.updateData(this.content,(input,position)=>{
        View.updateData(input,position)
      })
    } else if(this.command=='delete'){
      Model.deleteData(this.content,(input,position)=>{
        View.deleteData(input,position)
      })
    }
  }
}

module.exports = Controller
