const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

let todos = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const todo = {
    id: Date.now(),
    text: todoText,
    done: false,
  };

  todos.push(todo);
  renderTodos();
  todoInput.value = '';
});

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const checkBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    li.dataset.id = todo.id;
    span.textContent = todo.text;
    checkBtn.textContent = 'Done';
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';

    checkBtn.addEventListener('click', function() {
      const id = todo.id;
      const index = todos.findIndex(todo => todo.id === id);
      todos[index].done = !todos[index].done;
      renderTodos();
    });

    deleteBtn.addEventListener('click', function() {
      const id = todo.id;
      todos = todos.filter(todo => todo.id !== id);
      renderTodos();
    });

    editBtn.addEventListener('click', function() {
      const id = todo.id;
      const index = todos.findIndex(todo => todo.id === id);
      const li = todoList.querySelector(`[data-id="${id}"]`);
      const span = li.querySelector('span');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.classList.add('editing');
      span.replaceWith(input);
      editBtn.disabled = true;
      input.focus();

      input.addEventListener('blur', function() {
        const newTodoText = input.value.trim();
        if (newTodoText === '') {
          li.classList.remove('editing');
          input.replaceWith(span);
          editBtn.disabled = false;
          return;
        }

        todos[index].text = newTodoText;
        span.textContent = newTodoText;
        li.classList.remove('editing');
        input.replaceWith(span);
        editBtn.disabled = false;
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          input.blur();
        }
      });
    });

    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    if (todo.done) {
      li.classList.add('done');
    }
  });
}
