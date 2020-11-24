//=========MODEL==================

export class ListAppModel {
  constructor(userName) {
    if (localStorage.getItem(userName)) {
      this.userName = userName;
      this.userListsObj = JSON.parse(localStorage.getItem(userName));
    } else {
      console.log("new user");
      localStorage.setItem(
        userName,
        `{"test1":["item1","item2","item3"],
		  	  "test2":["item4","item5","item6"],
		  	  "test3":["item7","item8","item9"]}`
      );
      this.userListsObj = JSON.parse(localStorage.getItem(userName));
    }
  }

  setUserLists(userListsObj) {
    localStorage.setItem(this.userName, JSON.stringify(userListsObj));
  }

  // добавить проверки.
  setList(listName, listItems) {
    this.userListsObj[listName] = listItems;
    this.setUserLists(this.userListsObj);
  }

  deleteList(ListName) {
    delete this.userListsObj[ListName];
    this.setUserLists(this.userListsObj);
  }

  getList(ListName) {
    return this.userListsObj[ListName];
  }

  addListItem() {}

  delListItem() {}

  init() {
    console.log(`Aloha from ${this.userName}`);
  }
}
