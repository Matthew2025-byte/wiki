document.getElementById("logo").addEventListener("click", function() {
    location.href = "/"
})
document.getElementById("dark-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    // Check the current status of dark mode and update the cookie
    if (document.body.classList.contains("dark-mode")) {
        document.cookie = "darkMode=enabled; path=/";
    } else {
        document.cookie = "darkMode=disabled; path=/";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    console.log(document.cookie)
    var darkMode = document.cookie;
    if (darkMode == "darkMode=enabled") {
        console.log("dark mode enabled")
        document.body.classList.add("dark-mode");
    }
})