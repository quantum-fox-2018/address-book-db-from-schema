class Group {
  constructor(group_name) {
    this.groupName = group_name
  }
  createGroup(group) {
    db.run("INSERT INTO Groups VALUES (NULL, ?)", group.groupName)
    console.log(`group ${group.groupName} telah di save!`);
  }
}
