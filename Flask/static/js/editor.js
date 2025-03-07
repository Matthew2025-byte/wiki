const paragraphs = document.getElementById("paragraphs");
var Paragraph_Num = 1;
const Publish = document.getElementById("publish");
const Cancel = document.getElementById("cancel");

document.getElementById("add").addEventListener("click", function() {
    let Node = document.createElement("span");
    Node.innerHTML = `
        <span id='paragraph${Paragraph_Num}' class='paragraph_format'>
            Paragraph ${Paragraph_Num}
            <textarea class='paragraph' name="paragraph1"></textarea>
            <div class='btn' onclick="DeleteParagraph(${Paragraph_Num++})">Delete</div>
        </span>`
    Node.className = "paragraph_format"
    this.parentNode.insertBefore(Node, this)
})



Publish.addEventListener("click", async function() {
    const textareas = document.querySelectorAll("textarea");
    let paragraph_text = []
    textareas.forEach(element => {
        paragraph_text.push(element.value);
    });


    const data = {
        title: document.getElementById("title").value,
        paragraphs: paragraph_text
    };


    const response = await fetch(`/api/editor/${document.title}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    console.log(data)
    location.href = `/wiki/${document.title}`;
});


Cancel.addEventListener("click", function() {
    location.href = `/wiki/${document.title}`
});

function FormatParagraph(element, num) {
    return `
    <span id='paragraph${num}' class='paragraph_format'>
        Paragraph ${num}
        <textarea class='paragraph' name="paragraph${num}">${element}</textarea>
        <div class='btn' onclick="DeleteParagraph(${num})">Delete</div>
    </span>`
}
function DeleteParagraph(count) {
    const paragraph = document.getElementById(`paragraph${count}`);
    if (paragraph && paragraph.parentNode) {
        paragraph.parentNode.removeChild(paragraph);
    }
}


window.onload = async function() {
    const response = await fetch(`/api/article/${document.title}`);
    const result = await response.json();
    document.getElementById("title").value = result["title"];

    result["paragraphs"].forEach(element => {
        paragraphs.innerHTML += FormatParagraph(element, Paragraph_Num++);
    });
}
