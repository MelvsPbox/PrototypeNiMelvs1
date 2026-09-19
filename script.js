let currentXp = 450;
let difficultyIndex = 0;

const difficulties = ["Easy", "Moderate", "Advanced"];

function showScreen(id, btn) {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav button").forEach(b => {
        b.classList.remove("active");
    });

    if (btn) {
        btn.classList.add("active");
    }
}

function login() {
    const u = document.getElementById("username").value;

    if (!u) {
        showToast("Please enter a username.");
        return;
    }

    showScreen("dashboard");
    showToast("Welcome to ReadQuest!");
}

function demoLogin() {
    document.getElementById("username").value = "DemoPupil";
    document.getElementById("password").value = "demo";

    login();
}

function logout() {
    showScreen("login");
    showToast("Logged out.");
}

function showToast(msg) {
    const t = document.getElementById("toast");

    t.textContent = msg;
    t.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        t.style.display = "none";
    }, 2200);
}

function startActivity(name) {
    showScreen("activities");
    showToast(name + " started!");
}

function unpackWord(word) {
    const meanings = {
        running: "moving quickly on foot"
    };

    showToast(word + " = " + meanings[word]);
}

function answer(btn, correct) {
    document.querySelectorAll(".option").forEach(x => {
        x.classList.remove("correct", "wrong");
    });

    btn.classList.add(correct ? "correct" : "wrong");

    if (correct) {
        currentXp += 20;

        document.getElementById("xp").textContent = currentXp;
        document.getElementById("activityXp").textContent = currentXp;

        showToast("Correct! +20 XP ⭐");
    } else {
        showToast("Try again!");
    }
}

function nextQuestion() {
    document.getElementById("progress").style.width = "80%";

    showScreen("adaptive");

    showToast("Activity completed!");
}

function continueAdaptive() {
    showScreen("activities");

    showToast("New adaptive activity loaded.");
}

function changeDifficulty() {
    difficultyIndex = (difficultyIndex + 1) % 3;

    document.getElementById("adaptiveText").textContent =
        "Your next activity will use an " +
        difficulties[difficultyIndex] +
        " reading level.";

    showToast(
        "Difficulty changed to " +
        difficulties[difficultyIndex]
    );
}

function claimReward() {
    currentXp += 50;

    document.getElementById("xp").textContent = currentXp;

    showToast("+50 XP reward claimed! 🎉");
}

document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
});

document.getElementById("login").classList.add("active");
