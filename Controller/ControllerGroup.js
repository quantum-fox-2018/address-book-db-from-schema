const ModelGroup = require('../Model/ModelGroup.js');
const ViewGroup = require('../View/ViewGroup.js');

class ControllerGroup {
  static listGroup() {
    ModelGroup.listGroup(ViewGroup.listGroup);
  }

  static addGroup(attributesGroup) {
    let newGroup = new ModelGroup(attributesGroup);
    newGroup.addGroup(ViewGroup.addGroup);
  }

  static deleteGroup(id) {
    let newGroup = new ModelGroup();
    newGroup.findById(id, function() {
      newGroup.deleteGroup(ViewGroup.deleteGroup);
    });
  }
}

module.exports = ControllerGroup;
