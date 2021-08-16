let inc = (init = 0) => () => ++init;
let genId = inc();

class Todo {
    constructor(title = 'Default Title', description = '', status = false, due_date = new Date()) {
        this.id = genId()
        this.title = title;
        this.description = description;
        this.status = status;
        this.due_date = new Date(due_date);
    }
}

const todolist = [
    new Todo('To Be Happy', 'I want to be free from my ...', true, '2021-08-20'),
    new Todo('To find smth new in myself', '', false, '2021-08-17' ),
    new Todo('To break everything troubles', 'To find solution', false, '2021-08-15')
]

function createTitle (title, status) {
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
    Input.type = "checkbox";
    Input.checked = status;
    Status.append(Input);
    
    return Status;
}

function createDueDate(due_date) {
    let Due_date = document.createElement('td');
    Due_date.className = 'due-date';
    if(isDue(due_date)) Due_date.classList.add('due');
    Due_date.innerText = due_date.toLocaleDateString();
    
    return Due_date;
}

function isDue(date) {
    const currentDate = new Date();
    return date < currentDate;
}

function formatHTML(todolist) {
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
        return Todo
    })

    for (let i = 0; i < formattedArr.length; i++) {
        let table = document.querySelector('.todolist tbody');
        table.append(formattedArr[i])
    }
    return formattedArr;
}

formatHTML(todolist);