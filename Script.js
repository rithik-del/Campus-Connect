
// Get HTML elements
const searchInput = document.getElementById("search");
const eventCards = document.querySelectorAll(".event-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const registeredList = document.getElementById("registered-list");

let selectedCategory = "All";
let registeredEvents = [];

// Search and Filter Events
function filterEvents() {

    const searchText = searchInput.value.toLowerCase();

    let visibleCount = 0;

    eventCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = title.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    document.getElementById("no-results").hidden =
        visibleCount !== 0;
}

// Search Input
searchInput.addEventListener("input", filterEvents);

// Category Filter Buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterEvents();

    });

});

// Event Registration
const registerButtons = document.querySelectorAll(".register-btn");

registerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const eventName = button.dataset.event;

        if (registeredEvents.includes(eventName)) {
            alert("You have already registered for this event!");
            return;
        }

        registeredEvents.push(eventName);

        updateRegisteredEvents();

        alert("Registration successful for " + eventName + "!");

    });

});

// Update My Events
function updateRegisteredEvents() {

    registeredList.innerHTML = "";

    if (registeredEvents.length === 0) {
        registeredList.innerHTML =
            "<li>No registrations yet.</li>";
        return;
    }

    registeredEvents.forEach(event => {

        const li = document.createElement("li");

        li.textContent = "✅ " + event;

        registeredList.appendChild(li);

    });

}

// Contact Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    document.getElementById("contact-status").textContent =
        "Thank you, " + name + "! Your message has been received.";

    contactForm.reset();

});
