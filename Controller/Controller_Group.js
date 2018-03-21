const Group = require('../Model/Model_Group.js');
const ViewGroup = require('../View/View_Group.js')

class ControllerGroup {
  static add(name) {
    let properties = new Group(name);
    Group.add(properties, data => {
      ViewGroup.addSuccess(data);
    });
  }

  static update(id, name) {
    let properties = new Group(name);
    Group.update(id, properties, data => {
      ViewGroup.updateSuccess(data);
    });
  }

  static delete(id) {
    Group.delete(id, result => {
      ViewGroup.deleteSuccess(result);
    });
  }

  static show() {
    Group.show(data => {
      ViewGroup.show(data);
    });
  }
}

module.exports = ControllerGroup;
