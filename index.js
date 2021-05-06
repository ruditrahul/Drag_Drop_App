//Selectors

const addInput = document.querySelector("#add-input");
const addBtn = document.querySelector(".add-btn");
const tables = document.querySelector(".tables");


//Events
addBtn.addEventListener('click', addList);

//Functions

function addList(e) {
    const listName = addInput.value;
    const listMainDiv = document.createElement('div');
    listMainDiv.classList.add("main-div");

    const headingDiv = document.createElement('div');
    headingDiv.classList.add("head-div");
    const listHeading = document.createElement('h3');
    listHeading.classList.add("list-heading");
    listHeading.innerText = listName;
    headingDiv.appendChild(listHeading);

    const delbtn = document.createElement('button');
    delbtn.innerHTML = '<i class="fas fa-trash"></i>';
    delbtn.classList.add('del-btn');
    headingDiv.appendChild(delbtn);
    listMainDiv.appendChild(headingDiv);

    const listSearchDiv = document.createElement('div');
    listSearchDiv.classList.add("search-div");


    const listInput = document.createElement('input');
    listInput.classList.add('list-input');
    listInput.setAttribute("placeholder", " Add Tasks");
    listSearchDiv.appendChild(listInput);

    const listBtn = document.createElement('button');
    listBtn.classList.add('list-btn');
    listBtn.innerHTML = '<i class="fas fa-plus">';
    listSearchDiv.appendChild(listBtn);

    listMainDiv.appendChild(listSearchDiv);


    const listItemDiv = document.createElement('div');
    listItemDiv.classList.add("item-div");
    const listItemUL = document.createElement('ul');
    listItemUL.classList.add('list-ul');
    listItemDiv.appendChild(listItemUL);

    listMainDiv.appendChild(listItemDiv);
    tables.appendChild(listMainDiv);

    addInput.value = '';


    addTasks(listMainDiv);
    handleDrag();
    deleteTable(listMainDiv);


}


function deleteTable(listMainDiv) {
    const deleteBtn = listMainDiv.querySelector('.del-btn');

    deleteBtn.addEventListener('click', () => {
        listMainDiv.remove();
    })
}


function addTasks(listMainDiv) {
    console.log(listMainDiv.childNodes);

    const inputTask = listMainDiv.querySelector(".list-input");
    const addTaskBtn = listMainDiv.querySelector(".list-btn");
    const itemDiv = listMainDiv.querySelector(".list-ul");

    addTaskBtn.addEventListener("click", addTask);




    function addTask() {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        todoDiv.classList.add("draggable");
        todoDiv.setAttribute("draggable", "true");
        const list = document.createElement('li');
        list.innerText = inputTask.value;
        list.classList.add("todo-item");
        todoDiv.appendChild(list);
        const editbtn = document.createElement("button");
        editbtn.innerHTML = '<i class="fas fa-pen-square"></i>';
        editbtn.classList.add("edit-btn");
        todoDiv.appendChild(editbtn);

        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
        deletebtn.classList.add("trash-btn");
        todoDiv.appendChild(deletebtn);
        itemDiv.appendChild(todoDiv);

        inputTask.value = '';

        handleDrag();
        handleAlter(todoDiv,listMainDiv);
    }
}

function handleAlter(todoDiv,listMainDiv) {
    const delBtn = todoDiv.querySelector(".trash-btn");
    const editBtn = todoDiv.querySelector(".edit-btn");
    const input =listMainDiv.querySelector(".list-input");

    delBtn.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.classList.add("fall");
        e.target.parentNode.parentNode.addEventListener("transitionend", function () {
            e.target.parentNode.parentNode.remove();
        })
    })


    editBtn.addEventListener("click", (e) => {
        const targetItem = e.target;
        if (targetItem.parentNode.parentNode.classList.contains("edit-mode")) {
            targetItem.parentNode.parentNode.setAttribute("contenteditable","false");
            targetItem.parentNode.parentNode.classList.remove("edit-mode");
            input.value = '';
        } else {
            targetItem.parentNode.parentNode.classList.add("edit-mode");
            targetItem.parentNode.parentNode.setAttribute("contenteditable","true");

        }

    })
}


function handleDrag() {
    const containers = document.querySelectorAll(".item-div")
    const draggables = document.querySelectorAll(".draggable");
    console.log(draggables);

    console.log(containers);

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add("drag");
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove("drag");
        })
    })



    containers.forEach((container) => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector(".drag");
            const child_node = container.querySelector(".list-ul")
            child_node.appendChild(draggable);
        })
    })
}