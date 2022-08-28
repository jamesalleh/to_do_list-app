// get the task container by its ID
const taskContainer = document.querySelector("#tasks")
// get the "add task" button by its ID
const submitButton = document.querySelector("#new-task-submit")

// call a function when the window loads
window.addEventListener("DOMContentLoaded", () => {
    // get the tasks from local storage
    const tasks = localStorage.getItem("tasks")
    // turn the task array from a string back into an array
    const taskArr = JSON.parse(tasks)
    
    // traverse the task array and create a task for each of the data
    taskArr.forEach((task) => {
        createTask(task)
    })
} )

// call a function whenever the "add task" button is clicked
submitButton.addEventListener("click", (event) => {
    // since the button has a type value of submit we have to prevent the default behaviour so the page doesn't refresh
    event.preventDefault()

    // get the "input bar" by its ID
    // This is where the user will enter the task 
    const inputBar = document.querySelector("#new-task-input")
    // create a new task with the task entered by the user
    createTask(inputBar.value)
    // Call the save data function which saves the tasks to local storage
    saveData()

    // empty the input bar
    inputBar.value = ""
})

// create a new task
const createTask = (taskData) => {
    // create each of the divs in the tasks div
    const task = document.createElement("div");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    
    // set the class of each of the divs
    content.setAttribute("class", "content");
    actions.setAttribute("class", "actions");
    task.setAttribute("class", "task");
    
// create the text element in the content div
    const text = document.createElement("input")
    text.setAttribute("type", "text");
    text.setAttribute("class", "text");
    text.setAttribute("value", taskData);
    text.setAttribute("readonly", "readonly");
    
    // create the edit button in the actions div
    const edit = document.createElement("button")
    edit.setAttribute("class", "edit");
    edit.textContent = "edit";

    // run a function when the edit button is clicked
    edit.addEventListener("click", () => {
        // check the text content of the edit button to determine what to do
        if(edit.textContent === "edit"){
            // if the text says "edit" we want to make the text editable
            edit.textContent = "save"
            text.removeAttribute("readonly")
        }else{
            // if the text says save we want to save the data
            edit.textContent = "edit";
            text.setAttribute("readonly", "readonly")
            saveData()
        }
        
    })


// create the done button in the actions div
const done = document.createElement('button');
done.setAttribute('class', 'done');
done.textContent = 'DONE'

done.addEventListener('click', ()=>{
    if (done.textContent === 'DONE') {
        done.textContent = 'UNDONE'     
        text.style.textDecoration = 'line-through'
        
    } else {
        done.textContent = 'DONE';
        text.setAttribute('readonly', 'readonly');
        text.style.textDecoration = 'none'
        text.style.color = "white"
        saveData();
        
    }
    

})

// create the delete button in the actions div
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "delete");
    deleteButton.textContent = "delete"
    // run a function when the delete button is clicked
        deleteButton.addEventListener("click", () => {
            // remove the task from the tasksContainer
            taskContainer.removeChild(task)
            saveData()
        })
    
        // append alle the elements to their parents
    content.appendChild(text)
    actions.appendChild(edit)
    actions.appendChild(done)
    actions.appendChild(deleteButton)
    task.appendChild(content)
    task.appendChild(actions)
    taskContainer.appendChild(task)
}

    // save the data to local storage
const saveData = () => {
    // grab all the task divs
    const tasks = document.querySelectorAll(".task")

    // create an array to store the task input data
    const taskArr = []
    tasks.forEach((task) => {
        // traverse through the array and get each of the input elements
       const input = task.querySelector("input");

    //    put each of the input elements values in the task array
        taskArr.push(input.value)

    })

    // store the task array      in local storage
    localStorage.setItem("tasks", JSON.stringify(taskArr))
}