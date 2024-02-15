const createBtn = document.getElementById("createBtn");
const todoContainer = document.getElementById("todoContainer");

/*
 *createTodo function
 *Input: title: string, dueDate: string(ISO)
 *output: HtmlElement
 */
const createTodo = (title, dueDate) => {
  const newTodo = document.createElement("div");
  newTodo.className = "list-row";
  const template = `
          <div class="row-head">
            <input type="checkbox" class="todo-checkbox" checked />
            <div class="category-circle"></div>
            <span>${title}</span>
          </div>
          <div class="row-tail">
            <span class="due-date">${dueDate}</span>
            <button class="list-row-action-btn">
              <img alt="edit-btn" src="./assets/edit.svg" />
            </button>
            <button class="list-row-action-btn">
              <img alt="delete-btn" src="./assets/trash.svg" />
            </button>
`;
  newTodo.innerHTML = template;
  return newTodo;
};

createBtn.onclick = () => {
  todoContainer.append(createTodo("test", "D-10"));
};
