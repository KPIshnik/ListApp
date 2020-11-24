import { ListAppModel } from "/script/model.js";
import { ListAppView } from "/script/view.js";

const userName = "defaultUser7.5";
//============Control===============

class ListAppCtrl {
  constructor(listAppView, listAppModel) {
    this.listAppView = listAppView;
    this.listAppModel = listAppModel;
  }

  changeList(listName) {
    if (document.getElementById("addListItemButton")) return;
    let listItemsArr = this.listAppModel.getList(listName);
    this.listAppView.showList(listItemsArr);

    this.listAppView.showAddListItemButton();

    addListItemButton.addEventListener("click", addListItemModule.bind(this));

    saveListButton.addEventListener(
      "click",
      saveList.bind(this, listName, listItemsArr),
      { once: true }
    );

    list.addEventListener("dblclick", removeListItem.bind(this));

    function removeListItem(ev) {
      if (!ev.target.tagName == "LI") return;
      let value = ev.target.textContent;

      this.listAppView.removeItem(ev.target);
      listItemsArr.splice(listItemsArr.indexOf(value), 1);
    }

    function saveList(listName, listArr) {
      this.listAppModel.setList(listName, listArr);
      alert(`list ${listName} saved`);

      this.listAppView.clearScreen();

      changeListButton.removeEventListener("click", this.changeList);
    }

    function addListItem() {
      let value = addListItemForm.newListItemValue.value;

      listItemsArr.push(value);
      this.listAppView.displayListItem(value);
      this.listAppView.hideAddListItemForm();
    }

    function addListItemModule() {
      this.listAppView.showAddListItemForm();

      cancelAddListItemForm.addEventListener(
        "click",
        this.listAppView.hideAddListItemForm
      );

      addListItemForm.addEventListener("submit", addListItem.bind(this), {
        once: true,
      });
      return;
    }
    return;
  }

  createNewList(ev) {
    ev.preventDefault();
    let newListName = newListNameForm.newListName.value;

    if (this.listAppModel.getList(newListName)) {
      alert("list with this name already exists! Try another name");
    } else {
      this.listAppModel.setList(newListName, []);
      this.listAppView.clearScreen();
      this.changeList(newListName);
    }
  }
  createNewListCancel() {
    this.listAppView.hideNewListNameForm();
  }

  getNewListName() {
    //поработать с именем
    this.listAppView.clearScreen();
    this.listAppView.showNewListNameForm();

    newListNameForm.addEventListener("submit", this.createNewList.bind(this));
    newListNameForm.cancel.addEventListener(
      "click",
      this.createNewListCancel.bind(this)
    );
  }

  displayListOfLists() {
    this.listAppView.clearScreen();

    let listOfListsArr = [];

    for (let key in this.listAppModel.userListsObj) {
      listOfListsArr.push(key);
    }

    this.listAppView.showList(listOfListsArr);
  }

  displayList(ev) {
    let target = ev.target;
    if (target.tagName != "LI") return;
    let listName = target.textContent;
    let listArr = this.listAppModel.getList(listName);

    this.listAppView.showList(listArr);

    changeListButton.addEventListener(
      "click",
      this.changeList.bind(this, listName),
      { once: true }
    );
  }

  displayListModule() {
    this.displayListOfLists();
    list.addEventListener("click", this.displayList.bind(this));
  }

  removeList(ev) {
    let target = event.target;
    if (target.tagName != "LI") return;
    let listName = target.textContent;
    let listArr = this.listAppModel.deleteList(listName);

    alert(`list ${listName} removed!`);
    this.listAppView.removeItem(target);
  }

  removeListModule() {
    if (/*listLoaded()*/ false) {
    } else {
      this.displayListOfLists();
      list.addEventListener("dblclick", this.removeList.bind(this));
    }
  }

  clear() {
    this.listAppView.clearScreen();
  }

  init() {
    this.listAppView.init();
    this.listAppModel.init();

    load.addEventListener("click", this.displayListModule.bind(this));
    create.addEventListener("click", this.getNewListName.bind(this));
    clearList.addEventListener("click", this.clear.bind(this));
    delList.addEventListener("click", this.removeListModule.bind(this));
  }
}

//========================================

const listAppModel = new ListAppModel(userName);
const listAppView = new ListAppView();
const listApp = new ListAppCtrl(listAppView, listAppModel);

listApp.init();
