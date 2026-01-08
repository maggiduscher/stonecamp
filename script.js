document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("company").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    history.replaceState(null, document.title, window.location.pathname + window.location.search);
});

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const numbers = [105, 110, 102, 111, 64, 105, 116, 45, 115, 101, 114, 118, 105, 99, 101, 45, 115, 116, 101, 105, 110, 107, 97, 109, 112, 46, 100, 101];
    const subject = encodeURIComponent("Kontaktanfrage " + name);
    const body = encodeURIComponent(
        "Name:\n" + name + "\n\n" +
        "Nachricht:\n" + message
    );

    window.location.href = `mailto:Jan%20Steinkamp<${String.fromCharCode(...numbers)}>?subject=${subject}&body=${body}`;

    document.getElementById("form-feedback").style.display = "block";
});

const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const body = document.body;

function updateThemeIcons(isDark) {
    if (isDark) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        return;
    }
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
}

function setTheme(theme) {
    body.classList.remove("dark-mode", "light-mode");
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "dark" || ((theme === "" || theme === null) && isSystemDark)) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        updateThemeIcons(true);

        return;
    }

    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    updateThemeIcons(false);
}

setTheme(localStorage.getItem("theme"));

themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode") || 
                  (!body.classList.contains("light-mode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
        setTheme("light");
        return;
    }
    setTheme("dark");
    localStorage.setItem("theme", "dark");
});
