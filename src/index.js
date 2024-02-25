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

createBtn.onclick = () => openModal();
modalCancelBtn.onclick = () => closeModal();
modalOkBtn.onclick = () => {
  todoContainer.append(createTodo(modalNameField.value, modalDateField.value));
  closeModal();
};
/**
 * initModal input areas  when modal is open
 */
const initModal = () => {
  modalNameField.value = "";
  modalDateField.value = getDateString(new Date());
  modalFirstCategory.checked = true;
  modalOkBtn.innerText = "Create";
  /*init okBtn onClick action for create*/
  modalOkBtn.onclick = () => {
    todoContainer.append(
      createTodo(modalNameField.value, modalDateField.value),
    );
    closeModal();
  };
};
const openModal = (init = true) => {
  modal.style.display = "flex";
  if (init) initModal();
};
const closeModal = () => {
  modal.style.display = "none";
};
/*
 *
 *createTodo function
 *Input: title: string, dueDate: string(ISO)
 *output: HtmlElement
 */
const createTodo = (title, dueDate) => {
  const newTodo = document.createElement("div");
  newTodo.className = "list-row";
  const id = getNewId();
  newTodo.id = id;
  const { dDate, dateColor } = getdDate(dueDate);
  const radioValue = getSelectedCategory();
  const categoryColor = CATEGORY_COLOR[radioValue];
  const template = `
          <div class="row-head">
            <input type="checkbox" class="todo-checkbox" />
            <div class="category-circle" style="background: ${categoryColor}" value="${radioValue}"></div>
            <span>${title}</span>
          </div>
          <div class="row-tail">
            <span class="due-date" style="color: ${dateColor}" value="${getDateString(dueDate)}">${dDate}</span>
            <button class="list-row-action-btn" onclick="openEditModal(${id})">
              <img alt="edit-btn" src="./assets/edit.svg" />
            </button>
            <button class="list-row-action-btn" onclick="deleteTodo(${id})">
              <img alt="delete-btn" src="./assets/trash.svg" />
            </button>
          </div>
`;
  newTodo.innerHTML = template;
  return newTodo;
};

/**
 * return unique id using current time stamp
 */
const getNewId = () => {
  return new Date().getTime();
};
/*
 * delete todo by id
 */
const deleteTodo = (id) => {
  const todo = document.getElementById(id);
  todo.remove();
};
const openEditModal = (id) => {
  const todo = document.getElementById(id);
  const todoTexts = todo.getElementsByTagName("span");
  const categoryValue = todo
    .querySelector(".category-circle")
    .getAttribute("value");
  /** set modal values with todo values*/
  modalNameField.value = todoTexts[0].innerText;
  modalDateField.value = todoTexts[1].getAttribute("value");
  document.getElementsByName("category")[categoryValue - 1].checked = true;
  modalOkBtn.innerText = "Edit";
  openModal(false);
  /** update the modal ok btn to update todo */
  modalOkBtn.onclick = () => {
    updateTodo(id, modalNameField.value, modalDateField.value);
    closeModal();
  };
};
/*
 * update todo wichi is given id with modal values.
 */
const updateTodo = (id, name, dueDate) => {
  /* current there are two span in todo.
   * first one is for title,
   * second on is for date
   */
  const todo = document.getElementById(id);
  const todoTexts = todo.getElementsByTagName("span");
  const nameField = todoTexts[0];
  const dateField = todoTexts[1];

  // update name
  nameField.innerText = name;

  // update d-date
  const { dDate, dateColor } = getdDate(dueDate);
  dateField.innerText = dDate;
  dateField.style.color = dateColor;
  dateField.setAttribute("value", getDateString(dueDate));

  // update category
  const categoryValue = getSelectedCategory();
  const categoryColor = CATEGORY_COLOR[categoryValue];
  const categoryCircle = todo.querySelector(".category-circle");
  categoryCircle.style.background = categoryColor;
  categoryCircle.setAttribute("value", categoryValue);
};

/*
 * To return d-date and date color depend on dateDiff
 * arg: sDate: string
 * return: {dDate:string, dateColor: string}
 */
const getdDate = (sDate) => {
  const dateDiff = getdateDiff(sDate);
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
  return { dDate, dateColor };
};
/*
 * To return selected category value
 */
const getSelectedCategory = () => {
  return document.querySelector('input[name="category"]:checked').value;
};
/**
 * To return dayDiff between input(sDate) and today
 * arg: sDate:string todo date
 * return: dayDiff:number
 */
const getdateDiff = (sDate) => {
  const today = new Date();
  const todoDate = new Date(sDate);
  const dayDiff = Math.ceil((todoDate - today) / (1000 * 60 * 60 * 24));
  return dayDiff;
};

/**
 * return date string as YYYY-MM-DD format
 * arg: date: string
 */
const getDateString = (sDate) => {
  const date = new Date(sDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const dateString = year + "-" + month + "-" + day;
  return dateString;
};
