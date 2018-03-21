const Model = require('../models/model.js')
const View = require('../views/view.js')

class Controller{
  constructor(){

  }

  static insertData(inputTable,inputData) {
    Model.insertData(inputTable,inputData,View.printView)
  }

  static updateData(inputTable,inputData) {
    Model.updateData(inputTable,inputData,View.printView)
  }

  static deleteData(inputTable,inputData) {
    Model.deleteData(inputTable,inputData,View.printView)
  }

  static readAllData(inputTable) {
    Model.readAllData(inputTable,View.printView)
  }
  static readData(inputTable,inputData) {
    Model.readData(inputTable,inputData,View.printView)
  }
  static assignData(inputTable,inputData){
    Model.assignData(inputTable,inputData,View.printView)
  }
  static help(){
    for (let i = 0; i < Model.help().length; i++) {
      View.printView(Model.help()[i])
    }
  }

}

module.exports = Controller
