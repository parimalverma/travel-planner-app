const API_URL = "https://travel-planner-app-924313941638.asia-south1.run.app/api/v1/submit-plan";

// 🔹 Generate dynamic traveller fields
document.getElementById("personCount").addEventListener("change", function() {

    const count = this.value;
    const container = document.getElementById("travellersContainer");

    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="traveller-box">
                <label>Person ${i} Name</label>
                <input type="text" id="name_${i}" />

                <label>Person ${i} Age</label>
                <input type="number" id="age_${i}" />
            </div>
        `;
    }
});


// 🔹 Submit form
function submitForm() {

    const count = document.getElementById("personCount").value;

    const travellers = [];

    for (let i = 1; i <= count; i++) {
        travellers.push({
            name: document.getElementById(`name_${i}`).value,
            age: document.getElementById(`age_${i}`).value
        });
    }

    const payload = {
        source_city: document.getElementById("sourceCity").value,
        destination_city: document.getElementById("destinationCity").value,
        start_date: document.getElementById("startDate").value,
        end_date: document.getElementById("endDate").value,
        number_of_persons: count,
        additional_comment: document.getElementById("comments").value,

        preferred_transport: Array.from(
            document.querySelectorAll(".transport:checked")
        ).map(el => el.value),

        interests: Array.from(
            document.querySelectorAll(".interest:checked")
        ).map(el => el.value),

        travellers: travellers
    };

    console.log("Sending Payload:", payload);

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log("API Response:", data);
        alert("Travel plan received");
    })
    .catch(err => console.error(err));
}
