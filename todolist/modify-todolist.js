let inc = (init = 0) => () => ++init;
let genId = inc();

class Todo {
    constructor(titleOrObject = 'Default Title', description = '', status = false, due_date = new Date()) {
        if(typeof titleOrObject === 'object') {
            Object.assign(this, titleOrObject);
            this.id = genId()
            this.status = status;
            this.due_date = titleOrObject.due_date ? new Date(titleOrObject.due_date) : '';
        } else {
            this.id = genId()
            this.title = titleOrObject;
            this.description = description;
            this.status = status;
            this.due_date = new Date(due_date);
        }
    }
}

const todolist = [
    new Todo('To Be Happy', 'I want to be free from my ...', true, '2021-08-20'),
    new Todo('To find smth new in myself', '', false, '2021-08-17'),
    new Todo('To break everything troubles', 'To find solution', false, '2021-08-15')
];

function removeTodo(list, id) {
    let todo_id = list.findIndex(todo => todo.id === id);
    list.splice(todo_id, 1);
}

function changeStatusTodo(list, id) {
    list.find(todo => {
        if (todo.id === id) {
            todo.status = !todo.status;
        }
    });
}

function getOpenedTodo(list) {
    return list.filter(todo => todo.status === false);
}

const todolistBody = document.querySelector('.todolist tbody');

todolistBody.addEventListener('click', (e) => {
    let item = e.target;
    let currentTodo = item.closest('tr');

    if (item.className === 'terminator') {
        currentTodo.remove();
        removeTodo(todolist, +currentTodo.id)
    }

    if (item.className === 'status') {
        let title = currentTodo.querySelector('.title');
        title.classList.toggle('done')
        
        let due_date = currentTodo.querySelector('.due-date');
        due_date.classList.remove('due');

        changeStatusTodo(todolist, +currentTodo.id);

        let buttons = document.querySelectorAll('.toggle button');
        buttons.forEach(button => {
            if (button.className === 'opened active') {
                let allOpenedTodo = getOpenedTodo(todolist);
                drawTodolist(allOpenedTodo);
            }
        })
    }
})

const todolistFoot = document.querySelector('.todolist tfoot');

todolistFoot.addEventListener('click', (e) => {
    let buttons = document.querySelectorAll('.toggle button');
    if (buttons.length >= 1) {
        buttons.forEach(button => button.classList.remove('active'));
    }
    let item = e.target;
    if (item.className === 'all') {
        item.classList.toggle('active');
        drawTodolist(todolist);
    }
    if (item.className === 'opened') {
        let allOpenedTodo = getOpenedTodo(todolist);
        item.classList.toggle('active')
        drawTodolist(allOpenedTodo);
    }
})

const addTodoForm = document.forms['add-todo'];

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(addTodoForm);
    const todo = new Todo(Object.fromEntries(data.entries()));
    todolist.push(todo);

    let buttons = document.querySelectorAll('.toggle button');

    if (buttons[0].className === 'all active') {
        drawTodolist(todolist);
    }
    if (buttons[1].className === 'opened active') {
        let allOpenedTodo = getOpenedTodo(todolist);
        drawTodolist(allOpenedTodo);
    }

    addTodoForm.reset()
})

drawTodolist(todolist);
