const todoInput = document.querySelector(".todo__input");
const addBtn = document.querySelector(".todo__btn");
const todoList = document.querySelector(".todo__list");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
savedTodos.forEach((todo) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${todo.completed ? "checked" : ""}/>
    <span>${todo.text}</span>
    <button>Видалити</button>
    `;
  todoList.appendChild(li);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (todoInput.value !== "") {
    const todo = {
      text: todoInput.value,
      completed: false,
    };
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" />
    <span>${todoInput.value}</span>
    <button>Видалити</button>
    `;

    todoList.appendChild(li);
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    todoInput.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentNode;
    const index = Array.prototype.indexOf.call(todoList.children, li);
    savedTodos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    li.remove();
  } else if (e.target.tagName === "INPUT") {
    const li = e.target.parentNode;
    const index = Array.prototype.indexOf.call(todoList.children, li);
    savedTodos[index].completed = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  }
});
