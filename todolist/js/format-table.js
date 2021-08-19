function createTitle(title, status) {
    let titleNode = document.createElement('td');
    titleNode.className = "title";
    titleNode.innerText = title;
    if (status) titleNode.classList.add('done');

    return titleNode
}

function createDescription(description) {
    let descriptionNode = document.createElement('td');
    descriptionNode.className = "description";
    descriptionNode.innerText = description;

    return descriptionNode;
}

function createStatus(status) {
    let statusNode = document.createElement('td');
    let inputNode = document.createElement('input');
    inputNode.className = 'status';
    inputNode.type = "checkbox";
    inputNode.checked = status;
    statusNode.append(inputNode);

    return statusNode;
}

function createDueDate(due_date) {
    let due_dateNode = document.createElement('td');
    due_dateNode.className = 'due-date';
    if(due_date) {
        if (isDue(due_date)) due_dateNode.classList.add('due');
        due_dateNode.innerText = due_date.toLocaleDateString();
    }

    return due_dateNode;
}

function createDeleteButton() {
    let terminatorNode = document.createElement('td');
    terminatorNode.className = 'terminator';
    terminatorNode.innerHTML = '&#10006;';
    return terminatorNode;
}

function isDue(date) {
    const currentDate = new Date();
    return date <= currentDate;
}

function resetTable(table) {
    table.innerHTML = '';
}

function createTodoRow(todo) {
    const { id, title, description, status, due_date } = todo;
    
    let Todo = document.createElement('tr');
    Todo.id = id;

    Todo.append(
        createTitle(title, status),
        createDescription(description),
        createStatus(status),
        createDueDate(due_date),
        createDeleteButton()
    )

    return Todo
}


function drawTodolist(todolist) {
    if(todolist.length > 0) {
        let rows = todolist.map(createTodoRow);
        let table = document.querySelector('.todolist tbody');
        resetTable(table);
        table.append(...rows);
    } else {
        return document.createElement('tr');
    }
}
