const ModelContactGroup = require('../Model/ModelContactGroup.js');
const ViewContactGroup = require('../View/ViewContactGroup.js');

class ControllerContactGroup {
  static listContactGroup() {
    ModelContactGroup.listContactGroup(ViewContactGroup.listContactGroup);
  }

  static addContactGroup(attributesContactGroup) {
    let newContactGroup = new ModelContactGroup(attributesContactGroup);
    newContactGroup.addContactGroup(ViewContactGroup.addContactGroup);
  }

  static deleteContactGroup(id) {
    let newContactGroup = new ModelContactGroup();
    newContactGroup.findById(id, function() {
      newContactGroup.deleteContactGroup(ViewContactGroup.deleteContactGroup);
    });
  }
}

module.exports = ControllerContactGroup;
