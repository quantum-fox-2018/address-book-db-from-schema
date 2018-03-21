class ViewGroup {
  static setupDbSuccess(result) {
    console.log(result);
  }

  static addSuccess(result) {
    console.log(`Add Group name: ${result.name}`);
    console.log(result);
  }

  static updateSuccess(result) {
    console.log(`Update Group name: ${result.name}`);
    console.log(result);
  }

  static deleteSuccess(result) {
    console.log(result);
  }

  static show(result) {
    console.log(`Show ${result.length} Group(s):`);
    console.log(result);
  }
}

module.exports = ViewGroup;
