
const categories = [
    {
        id: 1,
        name: "School",
    },
    {
        id: 2,
        name: "Leisure"
    },
    {
        id: 3,
        name: "Work"
    }
]

const tasks = JSON.parse(localStorage.getItem("tasks"));

const populateTask = (viewTask= tasks) => {
    // spec = const taskItem = document.createElement("div");

    const task = document.querySelectorAll("#filter>div");
    // spec = task;
    // if(spec.classList == "")
    // {
    //     task.addEventListener("click", task.classList.add("active"))
    // }

    const taskContainer = document.querySelector("#task-con");
    taskContainer.innerHTML = "";
   
    viewTask.forEach(t => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.style.backgroundColor = t.displayColor;
        const item = `
        <div class="content">
            <div class="categories">
            ${t.categories.map(c => `<div>${categories.find(f => f.id == c).name}</div>`)
            }
            </div>
            <div class="task-title">
                ${t.title}
            </div>
            <div class="date-time">
                <div class="date">
                    <i class="fa-solid fa-calendar-days"></i>
                    <span>${t.date}</span>
                </div>
                <div class="time">
                    <i class="fa-regular fa-clock"></i>
                    <span>${t.time}</span>
                </div>
            </div>
        </div>
        <div class="icons">
            <div class="pen">
                <i class="fa-solid fa-pen"></i>
            </div>
            ${
                t.isChecked? `<i id="circle-${t.id}" class="fa-solid fa-circle-check circle"></i>` : `<i type="checkbox" id="circle-${t.id}" class="fa-regular fa-circle circle"></i>`
            }
            
        </div>

        `
        // document.getElementById("hidden").onclick = function checkClickFunc() {
        //     alert("Checkbox is clicked");
        //    }
        taskItem.innerHTML += item;
        taskContainer.appendChild(taskItem)
    })
}

const checkItem = () => {
    const circle = document.querySelectorAll(".circle");
    circle.forEach(c => c.addEventListener("click", () => {
        let clickedItemId = c.id.split("-")[1];
        const task = tasks.find(t => t.id == clickedItemId);
        console.log(task)
        if(task.isChecked){
            task.isChecked = false;
            c.classList = ["fa-regular fa-circle circle"]
        }
        else{

            task.isChecked = true;
            c.classList = ["fa-solid fa-circle-check circle"]
        }

        console.log(c.classList)
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }))
}
const Check = () => {
    let items = [];
   const x = document.querySelectorAll("#filters>div");
 
   x.forEach(w =>w.addEventListener("click", ()=>{
    if(w.textContent == "Today")
    { 
        items = tasks.filter(t=> new Date(t.date).toLocaleDateString() == new Date().toLocaleDateString())
    }
    else if(w.textContent == "Upcoming")
    {
        items = tasks.filter(t=> new Date(t.date) > new Date())
    }
    else if(w.textContent == "Task Done")
    {
        items = tasks.filter(t=> t.isChecked)
    }
    else items = tasks

    populateTask(items)
    
   }))

}
populateTask()
checkItem()
Check();