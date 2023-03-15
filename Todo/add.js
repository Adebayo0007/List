

const colors = ["#fbe114", "#4beed1", "#13d3fb", "#b6adff", "#fb1467", "#f5815c", "#148cfb", "#a949c1"]

var pickedColor = "";
var pickedCategories = []

const populateColors = () => {
    const colorContainer = document.querySelector("#color-con");
    colors.forEach((c, index) => {
        const color = document.createElement("div");
        color.classList.add("color")
        color.style.backgroundColor = c;
        colorContainer.prepend(color);
    })
}

const populateCategories = () => {
    const categoryContainer = document.querySelector("#categories");
    categories.forEach(c => {
        const category = document.createElement("div");
        category.classList.add("category");
        category.id = c.id;
        category.textContent = c.name;
        categoryContainer.appendChild(category);
    })
}

const pickColor = () => {
    const colors = document.querySelectorAll(".color");
    colors.forEach(c => c.addEventListener("click", () => {
        colors.forEach(co => co.id = "");
        pickedColor = c.style.backgroundColor;
        console.log("picked", pickedColor)
        c.id = "active";
    }))
}

const pickCategory = () => {
    const cats = document.querySelectorAll(".category");
    cats.forEach(c => c.addEventListener("click", () => {
        if (c.classList.contains("active")) {
            pickedCategories = pickedCategories.filter(f => f != c.id)
            c.classList.remove("active");
        }
        else {
            pickedCategories.push(c.id);
            c.classList.add("active")
        }
    }))
}

const addTask = () => {
    const submit = document.querySelector("#save-btn");
    submit.addEventListener("click", () => {
        const deadline = document.querySelector("#date-time");
        const title = document.querySelector("#title");
        console.log(deadline.value)
        if (pickColor != "" && pickedCategories.length > 0 && deadline.value != "" && location.value != "") {
            const date = new Date(deadline.value.split("T")[0])
            const options = { day: "numeric", month: "long", year: "numeric" }
            const taskItem = {
                id: tasks != null ? tasks.length + 1 : 1,
                title: title.value,
                date: date.toLocaleDateString("en-US", options),
                time: date.toLocaleTimeString(),
                isChecked: false,
                displayColor: pickedColor,
                categories: pickedCategories
            }
            const existingTasks = JSON.parse(localStorage.getItem("tasks"))
            if(existingTasks != null) localStorage.setItem("tasks", JSON.stringify([...existingTasks, taskItem]))
            else localStorage.setItem("tasks", JSON.stringify([taskItem]))
            
            location.href = "index.html"
        }
    })
}


// const chkBox = () => {
//     const boxes = document.querySelectorAll(".icons");
//     boxes.forEach(box => box.addEventListener("click", () => {
//         boxes.forEach(m => m.id = "");
//         isChecked = boxes;
//         boxes.id = "hidden";
//     }))

//     const chkBox = () => {
//         document.getElementById(".icons").checked = true;
//       }
      
//       function uncheck() {
//         document.getElementById(".icons").checked = false;
// }

// document.getElementById("icons").onclick = function checkClickFunc() {
//     alert("Checkbox is clicked");
//    }

populateColors()
populateCategories()
pickColor()
pickCategory()
addTask()