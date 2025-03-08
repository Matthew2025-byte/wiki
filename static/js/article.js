const Page = document.getElementById("page");

window.onload = async function() {
    const response = await fetch(`/api/article/${document.title}`)
    const result = await response.json()
    
    Page.innerHTML = FormatArticle(result)
}
document.getElementById("edit").addEventListener("click", function() {
    location.replace(`/editor/${document.title}`)
})

function FormatArticle(article) {
    let Doc = `<h2>${article["title"]}</h2>`;
    article["paragraphs"].forEach(element => {
        Doc += `<p>${element}</p>`
    });
    return Doc
}