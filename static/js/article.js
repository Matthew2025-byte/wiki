const Page = document.getElementById("page");

window.onload = async function() {
    const response = await fetch(`/api/article/${document.title}`);
    const result = await response.json();
    
    console.log(result);
    Page.innerHTML = FormatArticle(result);
}
document.getElementById("edit").addEventListener("click", function() {
    location.replace(`/editor/${document.title}`);
})

function FormatArticle(article) {
    let Doc_Info = article["Document-Info"];
    let Doc_Content = article["Document-Content"];
    let Doc = "";

    Doc_Content.forEach(element => {
        Doc += FormatLine(element)
    });
    console.log(Doc)
    return Doc
}
function FormatLine(text) {
    let type_tag = `<${text["type"]}>`
    let tag_end = `</${text["type"]}>`

    return type_tag + text["text"] + tag_end;
}