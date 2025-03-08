document.getElementById("logo").addEventListener("click", function() {
    location.href = "/"
})
document.getElementById("dark-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    // Check the current status of dark mode and update the cookie
    if (document.body.classList.contains("dark-mode")) {
        document.cookie = "darkMode=enabled"
    } else {
        document.cookie = "darkMode=disabled";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    var darkMode = document.cookie;
    if (darkMode == "darkMode=enabled") {
        document.body.classList.add("dark-mode");
    }
})