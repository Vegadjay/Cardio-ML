// Dark Mode Toggle
document.getElementById("darkMode").addEventListener("change", function () {
    document.body.classList.toggle("dark");
});

// Set initial risk bar to 0%
window.onload = () => {
    const bar = document.getElementById("riskBar");
    bar.style.width = "0%";
    bar.innerText = "0%";
};

function showRisk() {
    const form = document.querySelector("form");

    // Get values using name
    const age = Number(form.age.value);
    const gender = Number(form.gender.value);
    const height = Number(form.height.value);
    const weight = Number(form.weight.value);
    const systolic = Number(form.systolic.value);
    const diastolic = Number(form.diastolic.value);
    const cholesterol = Number(form.cholesterol.value);
    const glucose = Number(form.glucose.value);
    const smoking = form.smoking.checked;
    const alcohol = form.alcohol.checked;
    const active = form.active.checked;

    // Validation
    if (!age || !gender || !height || !weight || !systolic || !diastolic) {
        alert("Please fill all required fields!");
        return;
    }

    // Calculate risk (demo logic)
    let risk = 0;
    risk += age * 0.3;
    risk += (gender === 1 ? 5 : 3);
    risk += (cholesterol - 1) * 10;
    risk += (glucose - 1) * 10;
    risk += smoking ? 10 : 0;
    risk += alcohol ? 5 : 0;
    risk -= active ? 5 : 0;

    risk = Math.min(Math.max(risk, 0), 100); // ensure 0-100

    // Show risk box
    const bar = document.getElementById("riskBar");
    document.getElementById("riskBox").classList.remove("d-none");

    // Animate risk bar from 0 → calculated value
    let current = 0;
    bar.style.width = "0%";
    bar.innerText = "0%";
    const interval = setInterval(() => {
        if (current >= risk) {
            clearInterval(interval);
        } else {
            current++;
            bar.style.width = current + "%";
            bar.innerText = Math.round(current) + "% Risk";
        }
    }, 10); // animation speed, 10ms per step

    // Clear the form after calculation
    form.reset();
}
