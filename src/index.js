const DATE_COLOR = {
  left: "#9F9F9F",
  default: "#F6C23A",
  over: "#EC3D3D",
};
const CATEGORY_COLOR = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
};

const createBtn = document.getElementById("createBtn");
const todoContainer = document.getElementById("todoContainer");

/**Modal elements */
const modal = document.getElementById("createModal");
const modalOkBtn = document.getElementById("okModal");
const modalCancelBtn = document.getElementById("cancelModal");
const modalNameField = document.getElementById("name");
const modalDateField = document.getElementById("dueDate");
const modalFirstCategory = document.querySelector('input[name="category"]');

createBtn.onclick = () => {
  modal.style.display = "flex";
  initModal();
};

modalOkBtn.onclick = () => {
  todoContainer.append(createTodo(modalNameField.value, modalDateField.value));
  modal.style.display = "none";
};
modalCancelBtn.onclick = () => {
  modal.style.display = "none";
};

/**
 * initModal input areas  when modal is open
 */
const initModal = () => {
  modalNameField.value = "";
  modalDateField.value = getTodayString();
  modalFirstCategory.checked = true;
};
/*
 *createTodo function
 *Input: title: string, dueDate: string(ISO)
 *output: HtmlElement
 */
const createTodo = (title, dueDate) => {
  const newTodo = document.createElement("div");
  newTodo.className = "list-row";
  const dateDiff = getDdate(dueDate);
  let dDate = `D-${dateDiff}`;
  let dateColor = DATE_COLOR["default"];
  if (dateDiff > 0) {
    if (dateDiff > 10) {
      dateColor = DATE_COLOR["left"];
    }
  } else {
    dDate = `D+${Math.abs(dateDiff)}`;
    dateColor = DATE_COLOR["over"];
    if (dateDiff == 0) {
      dDate = "D-day";
    }
  }
  const radioValue = document.querySelector(
    'input[name="category"]:checked',
  ).value;
  const categoryColor = CATEGORY_COLOR[radioValue];
  const template = `
          <div class="row-head">
            <input type="checkbox" class="todo-checkbox" checked />
            <div class="category-circle" style="background: ${categoryColor}"></div>
            <span>${title}</span>
          </div>
          <div class="row-tail">
            <span class="due-date" style="color: ${dateColor}">${dDate}</span>
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

/**
 * To return dayDiff between input(sDate) and today
 * arg: sDate:string todo date
 * return: dayDiff:number
 */
const getDdate = (sDate) => {
  const today = new Date();
  const todoDate = new Date(sDate);
  const dayDiff = Math.ceil((todoDate - today) / (1000 * 60 * 60 * 24));
  return dayDiff;
};

/**
 * to get today date string as YYYY-MM-DD format
 */
const getTodayString = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const dateString = year + "-" + month + "-" + day;
  return dateString;
};
