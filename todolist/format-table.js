function createTitle(title, status) {
    let Title = document.createElement('td');
    Title.className = "title";
    Title.innerText = title;
    if (status) Title.classList.add('done');

    return Title
}

function createDescription(description) {
    let Description = document.createElement('td');
    Description.className = "description";
    Description.innerText = description;

    return Description;
}

function createStatus(status) {
    let Status = document.createElement('td');
    let Input = document.createElement('input');
    Input.className = 'status';
    Input.type = "checkbox";
    Input.checked = status;
    Status.append(Input);

    return Status;
}

function createDueDate(due_date) {
    let Due_date = document.createElement('td');
    Due_date.className = 'due-date';
    if (isDue(due_date)) Due_date.classList.add('due');
    Due_date.innerText = due_date.toLocaleDateString();

    return Due_date;
}

function createTerminator() {
    let Terminator = document.createElement('td');
    Terminator.className = 'terminator';
    Terminator.innerHTML = '&#10006;';
    return Terminator;
}

function isDue(date) {
    const currentDate = new Date();
    return date <= currentDate;
}

function resetTable(table) {
    table.innerHTML = '';
}

function drawTodolist(todolist) {
    if(todolist.length > 0) {
        let formattedArr = todolist.map((todo) => {
            const { id, title, description, status, due_date } = todo;
    
            let Todo = document.createElement('tr');
            Todo.id = id;
    
            let Title = createTitle(title, status);
            Todo.append(Title);
    
            let Description = createDescription(description);
            Todo.append(Description);
    
            let Status = createStatus(status);
            Todo.append(Status);
    
            let Due_date = createDueDate(due_date);
            Todo.append(Due_date);
    
            let Terminator = createTerminator();
            Todo.append(Terminator);
    
            return Todo
        })
    
        let table = document.querySelector('.todolist tbody');
        resetTable(table)
    
        for (let i = 0; i < formattedArr.length; i++) {
            let tableBody = document.querySelector('.todolist tbody');
            tableBody.append(formattedArr[i])
        }
        return formattedArr;
    } else {
        return document.createElement('tr');
    }
}
