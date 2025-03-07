document.getElementById('add').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});

document.getElementById("submit").addEventListener("click", async function() {
    const response = await fetch("api/article-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "Title": document.getElementById("Title").value })
    })
    location.reload()
})