const HelpModel = require('../model/HelpModel');
const HelpView = require('../view/HelpView');

class HelpController{
  static retriveHelp(){
    HelpModel.help(HelpController.tampilkanHelp)
  }

  static tampilkanHelp(dataHelps){
    HelpView.displayHelp(dataHelps)
  }

}

module.exports = HelpController
