function FormatTableEntry(EntryJson) {
    return `
    <tr>
        <td><a href="${EntryJson["url"]}">${EntryJson["title"]}</a></td>
        <td>${FormatTime(EntryJson["updated"])}</td>
        <td>${FormatTime(EntryJson["created"])}</td>
    </tr>
    `
}
function FormatTime(TimeJson) {
    console.log(TimeJson)
    return `${TimeJson["month"]} ${TimeJson["day"]}, ${TimeJson["year"]} - ${TimeJson["hour"]}:${TimeJson["minute"]}`
}

window.onload = async function() {
    let Table = document.getElementById("table");
    let response = await fetch("/api/article-list");
    let data = await response.json();
    
    data.forEach(element => {
        Table.innerHTML += FormatTableEntry(element);
    });
}