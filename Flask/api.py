import json
import jsonschema

def get_article(url):
    with open(f"wiki/article-list.json") as file:
        data = json.load(file)
        for entry in data:
            if entry["url"] == url:
                with open(entry["file"]) as file:
                    return json.load(file)
            continue
        return "null"

def create_article(info: dict, article: dict):
    with open("wiki/article-list.json") as file:
        data = json.load(file)
    
    with open("wiki/article-schema.json") as file:
        schema = json.load(file)
    

    # Create Article
    try:
        jsonschema.validate(instance=article, schema=schema)
        file_location = f"wiki/articles/{info['title']}.json"
        with open(file_location, "w") as file:
            json.dump(article, file, indent=4)
    except jsonschema.exceptions.ValidationError as err:
        print("Data is invalid:", err)


    info["file"] = file_location
    info["url"] = f"wiki/{info['title']}"
    # Add article to info list
    data.append(info)
    with open("wiki/article-list.json", "w") as file:
        json.dump(data, file, indent=4)

def edit_article(edits: dict):
    with open("wiki/article-schema.json") as file:
        schema = json.load(file)

    try:
        jsonschema.validate(edits, schema)
    except jsonschema.exceptions.ValidationError as err:
        print("Data is invalid:", err)
        return

    with open("wiki/article-list.json") as file:
        data = json.load(file)
    for entry in data:
        if entry["title"] == edits["title"]:
            with open(entry["file"], "w") as file:
                json.dump(edits, file, indent=4)
                return
        continue

    