const name = document.getElementById("name");
const dueDate = document.getElementById("dueDate");
const btn = document.getElementById("okBtn");

btn.onclick = () => {
  const checked = document.querySelector("input[type=radio]:checked");
  console.log("btn clicked");
  console.log(name.value);
  console.log(dueDate.value);
  console.log(checked.value);
  dueDate.value = "2023-02-12";
};
