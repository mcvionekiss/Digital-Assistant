document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const quoteElement = document.getElementById("quote");

    // Fetch a daily motivational quote
    async function fetchQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            quoteElement.textContent = `"${data.content}" - ${data.author}`;
        } catch (error) {
            quoteElement.textContent = "Stay motivated! You got this!";
        }
    }
    fetchQuote();

    // Add a task to a specific day
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const dueDate = new Date(document.getElementById("dueDate").value);
        const priority = document.getElementById("priority").value;
        const category = document.getElementById("category").value;

        // Determine the day of the week
        const dayName = days[dueDate.getDay() - 1] || "Sunday";

        // Create the task element
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <input type="checkbox">
            <span>${taskName} [${category}] - ${priority}</span>
        `;

        // Append the task to the corresponding day
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
            // Reset the form
            taskForm.reset();
        });

        // Reset the form
        taskForm.reset();

    });
});
