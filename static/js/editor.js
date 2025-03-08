const Publish = document.getElementById("publish");
const Cancel = document.getElementById("cancel");
const Editor = document.getElementById("editor-text");

Publish.addEventListener("click", async function() {
    let text = Editor.innerText;

    const response = await fetch(`/api/editor/${document.title}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Compile(text)
    });
    //location.href = `/wiki/${document.title}`;
});
Cancel.addEventListener("click", function() {
    location.href = `/wiki/${document.title}`
});


window.onload = async function() {
    const response = await fetch(`/api/article/${document.title}`);
    const result = await response.json();
    
    const Doc_Content = result["Document-Content"];
    Doc_Content.forEach(element => {
        Editor.innerHTML += FormatLine(element);
        Editor.innerHTML += "\\n";
    });
}


function Compile(text) {
    TextArray = text.split("\n");
    console.log(TextArray)
    Tags = []
    TextArray.forEach(element => {
        let format = GetFormat(element);
        Tags.push({"type": format[0], "text": format[1]})
    });

    console.log(Tags)
    
    return JSON.stringify({
        "Document-Info": {
            "title": document.title
        },
        "Document-Content": Tags
    });
    
}

function GetFormat(text) {
    if (text.startsWith("!{") && text.includes("}")) {
        // Find the position of the closing brace
        let endPos = text.indexOf("}") + 1;
        
        let format = text.substring(2, endPos - 1);
        let Text = text.substring(endPos);
        return [format, Text];
    }
    return ["p", text];
}

function FormatLine(text) {
    let type = text["type"]

    return `!{${type}}${text["text"]}`;
}





document.addEventListener('keydown', function(e){
    //detect 'tab' key
    if(e.key === 'Tab'){
            //insert a tab character
            document.execCommand('insertText', false, '\t');
            //prevent focusing on next element
            e.preventDefault();
    }
});