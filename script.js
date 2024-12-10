document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const quoteElement = document.getElementById("quote");

    // Fetch a random quote from the Quotes API and display it
    const fetchQuote = () => {
        const apiKey = '+6zS5fDiLAHq1xEO37HMUw==ZBzkzrodRk2PuDFh'; 
        const url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';

        fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const quoteElement = document.getElementById('quote');
            if (data && data.length > 0) {
                quoteElement.textContent = `"${data[0].quote}" - ${data[0].author}`;
            } else {
                quoteElement.textContent = "No quotes available.";
            }
        })
        .catch(error => console.error('Error fetching the quote:', error));
    };
    fetchQuote();

    // Add task from the form to the the specific tab of the day
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const dueDate = new Date(document.getElementById("dueDate").value);
        const priority = document.getElementById("priority").value;
        const category = document.getElementById("category").value;
        
        const dayName = days[dueDate.getDay()] || "Sunday";

        // Create new user task
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <input type="checkbox">
            <span>${taskName} [${category}] - ${priority}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Add the task to the corresponding tab
        document.getElementById(dayName).appendChild(taskElement);

        // Add event listener for checkbox
        const checkbox = taskElement.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", (e) => {
            const taskText = taskElement.querySelector("span");
            if (e.target.checked) {
                taskElement.classList.add("completed");
            } else {
                taskElement.classList.remove("completed");
            }
    
            taskForm.reset();
        });

        // Add event listener for deleting a task
        const deleteButton = taskElement.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            taskElement.remove();
        });

        // Add event listener for editing a task
        const editButton = taskElement.querySelector('.edit-btn');
        editButton.addEventListener("click", () => {
            // Check if the task is already in edit mode
            if (taskElement.classList.contains("editing")) {
                // Save changes
                const taskNameInput = taskElement.querySelector(".task-name-input");
                const categorySelect = taskElement.querySelector(".task-category-select");
                const prioritySelect = taskElement.querySelector(".task-priority-select");
        
                // Update the task display with the edited values
                const updatedTaskName = taskNameInput.value;
                const updatedCategory = categorySelect.value;
                const updatedPriority = prioritySelect.value;
        
                taskElement.querySelector("span").innerHTML = `${updatedTaskName} [${updatedCategory}] - ${updatedPriority}`;
        
                // Remove input fields and reset the task element to view mode
                taskElement.classList.remove("editing");
                taskNameInput.remove();
                categorySelect.remove();
                prioritySelect.remove();
        
                editButton.textContent = "Edit";
            } else {
                // Enter edit mode
                taskElement.classList.add("editing");
        
                // Get current task details
                const taskDetails = taskElement.querySelector("span").textContent.split(" - ");
                const currentTaskName = taskDetails[0].split(" [")[0];
                const currentCategory = taskDetails[0].split(" [")[1].slice(0, -1);
                const currentPriority = taskDetails[1];
        
                // Replace text with input fields
                const taskNameInput = document.createElement("input");
                taskNameInput.type = "text";
                taskNameInput.value = currentTaskName;
                taskNameInput.classList.add("task-name-input");
        
                const categorySelect = document.createElement("select");
                categorySelect.classList.add("task-category-select");
                ["School", "Social", "Work", "Personal"].forEach((category) => {
                    const option = document.createElement("option");
                    option.value = category;
                    option.textContent = category;
                    if (category === currentCategory) option.selected = true;
                    categorySelect.appendChild(option);
                });
        
                const prioritySelect = document.createElement("select");
                prioritySelect.classList.add("task-priority-select");
                ["High", "Medium", "Low"].forEach((priority) => {
                    const option = document.createElement("option");
                    option.value = priority;
                    option.textContent = priority;
                    if (priority === currentPriority) option.selected = true;
                    prioritySelect.appendChild(option);
                });
        
                // Replace task details with input fields
                const taskSpan = taskElement.querySelector("span");
                taskSpan.innerHTML = "";
                taskSpan.appendChild(taskNameInput);
                taskSpan.appendChild(categorySelect);
                taskSpan.appendChild(prioritySelect);
        
                editButton.textContent = "Save";
            }
        });

        taskForm.reset(); 
    });
});


