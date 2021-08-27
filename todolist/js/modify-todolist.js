class Todo {
    constructor(titleOrObject = 'Default Title', description = '', status = false, due_date = new Date()) {
        if (typeof titleOrObject === 'object') {
            Object.assign(this, titleOrObject);
            this.due_date = titleOrObject.due_date ? new Date(titleOrObject.due_date) : '';
            this.status = titleOrObject.status ?? false;
        } else {
            this.title = titleOrObject;
            this.description = description;
            this.status = status;
            this.due_date = new Date(due_date);
        }
    }
}

const todolist = [];

function removeTodo(list, id) {
    let todo_id = list.findIndex(todo => todo.id === id);
    list.splice(todo_id, 1);
    deleteTodo(id);
}

function changeStatusTodo(list, id) {
    list.find(todo => {
        if (todo.id === id) {
            todo.status = !todo.status;
            updateTodo(todo, id);
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

const todolistFooter = document.querySelector('.todolist tfoot');

todolistFooter.addEventListener('click', (e) => {
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
    const formData = new FormData(addTodoForm);
    const todo = Object.fromEntries(formData.entries());
    postTodo(todo)
        .then(data => {
            todolist.push(new Todo(data));

            let buttons = document.querySelectorAll('.toggle button');

            if (buttons[0].className === 'all active') {
                drawTodolist(todolist);
            }
            if (buttons[1].className === 'opened active') {
                let allOpenedTodo = getOpenedTodo(todolist);
                drawTodolist(allOpenedTodo);
            }
        })
        .then(_ => addTodoForm.reset());

})

function getTodoList() {
    return fetch('http://localhost:3000/todolist')
        .then(res => res.json())
        .then(list => {
            list.forEach(todo => todolist.push(new Todo(todo)));
            drawTodolist(todolist);
        });
}

function postTodo(todo) {
    return fetch('http://localhost:3000/todolist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
}

function updateTodo(todo, id) {
    return fetch(`http://localhost:3000/todolist/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
}

function deleteTodo(id) {
    return fetch(`http://localhost:3000/todolist/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
}

getTodoList();
