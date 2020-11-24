//=========View================
export class ListAppView {
  constructor() {}

  clearScreen() {
    document.querySelector("main").innerHTML = `<ol id='list'>
			</ol>`;
  }

  showList(listArr) {
    this.clearScreen();

    for (let value of listArr) {
      this.displayListItem(value);
    }
  }

  showNewListNameForm() {
    // переписать это говно в нормальный код.
    let newListDiv = document.createElement("div");
    newListDiv.innerHTML = `<form id='newListNameForm'>
			New list name:
			
			<p>
			<input type="text" name="newListName" autocomplete="off"> 
	 		</p>

			<button type='button' name = 'cancel'>cancel</button>
			<input type="submit" name="ok"  value ='ok'>
			
		</form>`;
    newListDiv.classList.add("modalWindow");
    document.querySelector("main").append(newListDiv);
  }

  hideNewListNameForm() {
    document.querySelector(".modalWindow").remove();
  }

  removeItem(target) {
    target.remove();
  }

  showAddListItemButton() {
    list.insertAdjacentHTML(
      "afterend",
      '<span id = "addListItemButton">+</span>'
    );
    //document.querySelector('main')
    //.insertAdjacentHTML('beforeend', '<span id = "addListItemButton">+</span>');
  }

  showAddListItemForm() {
    askValueWindow.style.display = "inline-block";

    addListItemForm.newListItemValue.value = "";
    addListItemForm.newListItemValue.focus();
  }

  hideAddListItemForm() {
    event.preventDefault();
    askValueWindow.style.display = "none";
  }

  displayListItem(value) {
    let li = document.createElement("li");
    li.textContent = value;
    list.append(li);
  }

  init() {
    console.log("Aloha from View");
  }
}
