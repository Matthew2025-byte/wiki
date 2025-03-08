const Publish = document.getElementById("publish");
const Cancel = document.getElementById("cancel");

Publish.addEventListener("click", async function() {
    let text = document.getElementById("editor").innerText;

    const formattedText = text.replace(/\n/g, "\\n");
    console.log(formattedText);


    const response = await fetch(`/api/editor/${document.title}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"text": text})
    });
    console.log(JSON.stringify({"text": text}))
    //location.href = `/wiki/${document.title}`;
});




Cancel.addEventListener("click", function() {
    location.href = `/wiki/${document.title}`
});


window.onload = async function() {
    const response = await fetch(`/api/article/${document.title}`);
    const result = await response.json();
    
    // Load document from "result" here
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