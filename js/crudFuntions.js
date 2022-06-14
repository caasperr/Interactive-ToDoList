const inputNewTodo = document.getElementById('input-new-task');
const taskContainer = document.getElementById('Task-Container');
const targetDataDiv = document.getElementById('show-items-qty');
const delBtn = document.querySelectorAll('.delete-btn');
const errorField = document.getElementById('Display-Error');

let todo = JSON.parse(localStorage.getItem('Tasks')) || [];

let i = 0;

const populateLocalStorage = () => {
  const data = JSON.stringify(todo);
  localStorage.setItem('Tasks', data);
};

const display = () => {
  taskContainer.innerHTML = '';
  let j = 0;
  todo.forEach((element) => {
    j += 1;
    taskContainer.innerHTML += `<li id="Task${j}" class="list-item">
                <div class="sub-task">
                  <div class="checkbox" id="input-div"></div>
                  <input
                    class="input-task"
                    id="Task${j}"
                    for="Task ${j}"
                    disabled
                    value="${element.description}"
                  />
                </div>
                <div class="btn-container">
                  <span class="del-btn material-symbols-outlined edit-btn" id=""edit${j}> edit </span>
                  <span class="del-btn material-symbols-outlined delete-btn" id=del${j}> delete </span>
                </div>
              </li>`;
  });
  registerElements();
  targetDataDiv.innerHTML = `${todo.length} Items Left`;
  // errorField.innerHTML = '';
};

const reAssignIndex = () => {
  let k = 0;
  todo.forEach((elem) => {
    k += 1;
    elem.index = k;
  });
};

const registerElements = () => {
  if (todo.length > 0) {
    //   const checkboxes = document.querySelectorAll('.check-box');
    const targetTaskField = document.querySelectorAll('.input-task');
    //   const kebabMenu = document.querySelectorAll('.vertical-dots');
    //   const doneBtn = document.querySelectorAll('.done-btn');
    const delBtn = document.querySelectorAll('.delete-btn');
    const editBtn = document.querySelectorAll('.edit-btn');

    //   checkboxes.forEach((box) => {
    //     box.addEventListener('click', this.updateCompleteTask.bind(this));
    //   });
    //   kebabMenu.forEach((dot) => {
    //     dot.addEventListener('click', this.kebabMenuClicked.bind(this));
    //   });
    //   doneBtn.forEach((done) => {
    //     done.addEventListener('click', this.saveChanges.bind(this));
    //   });

    // targetTaskField.forEach((input) => {
    //   input.addEventListener('click', () => {
    //     const targetBtn = input.target;
    //     const targetParent = targetBtn.parentElement;
    //     targetParent.classList.add('dot-menu');
    //     targetParent.children[0].children[1].disabled = false;
    //     targetParent.children[1].style.display = 'none';
    //     targetParent.children[3].style.display = 'block';
    //     targetParent.children[2].style.display = 'block';
    //   });
    // });

    delBtn.forEach((del) => {
      del.addEventListener('click', () => {
        const delBtn = del;
        console.log(del);
        console.log(delBtn.id);
        todo.forEach((n) => {
          console.log('called');
          if (delBtn.id === `del${n.index}`) {
            todo.splice(n.index - 1, 1);
          }
        });
        reAssignIndex();
        populateLocalStorage();
        display();
      });
    });
    //   dragging();

    targetTaskField.forEach((task) => {
      task.addEventListener('keypress', (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          task.disabled = true;
          console.log(task);
          task.parentElement.parentElement.classList.remove('editable-task');
          todo.forEach((n) => {
            if (task.id === `Task${n.index}`) {
              n.description = task.value;
            }
          });
          populateLocalStorage();
          display();
        }
      });
    });

    editBtn.forEach((edit) => {
      edit.addEventListener('click', () => {
        const editBtn = edit;
        let targetInput =
          editBtn.parentElement.parentElement.children[0].children[1];
        targetInput.disabled = false;
        editBtn.parentElement.parentElement.classList.add('editable-task');
        // populateLocalStorage();
        // display();
      });
    });
  }
};

let k = todo.length;

const add = (description, completed = false, index = (k += 1)) => {
  todo.push({ description, completed, index });
  populateLocalStorage();
  display();
};

inputNewTodo.addEventListener('keypress', (e) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if(inputNewTodo.value.length > 0 )
    {
    add(inputNewTodo.value);
    inputNewTodo.value = '';
    }
    else {
      errorField.innerHTML = 'Input Field cannot be empty!!';
      setTimeout(() => {
        errorField.innerHTML = '';
      }, 5000);
  }
}
});

display();
