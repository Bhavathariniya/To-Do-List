const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const priority = document.getElementById("priority");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        
        if (priority.value === 'high') {
            li.style.color = 'red';
            listContainer.prepend(li); 
        } else if (priority.value === 'medium') {
            li.style.color = 'green';
            
            let lowPriorityItem = Array.from(listContainer.children).find(item => item.style.color === 'yellow');
            if (lowPriorityItem) {
                listContainer.insertBefore(li, lowPriorityItem);
            } else {
                listContainer.appendChild(li);
            }
        } else {
            li.style.color = 'yellow';
            listContainer.appendChild(li);
        }

        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}


showTask();
