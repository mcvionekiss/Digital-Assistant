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


        taskForm.reset();

    });
});
