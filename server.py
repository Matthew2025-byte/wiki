from flask import Flask, render_template, jsonify, request
import json
import api
from datetime import datetime

app = Flask(__name__)


# Webpages
@app.route("/")
def INDEX_HANDLER():
    return render_template("index.html")

@app.route("/wiki/<article>")
def WIKI_HANDLER(article):
    return render_template("article.html", TITLE=article)

@app.route("/editor/<article>")
def EDITOR_HANDLER(article):
    return render_template("editor.html", TITLE=article), 200




# API
@app.route("/api/article/<article>")
def api_WIKI_HANDLER(article):
    return jsonify(api.get_article(f"wiki/{article}")), 200

@app.route("/api/editor/<article>", methods=["POST"])
def api_EDITOR_HANDLER(article):
    print("activated")
    data = request.get_json()
    print(data)
    Update = {
        "title": article,
        "paragraphs": [data["text"]]
    }
    api.edit_article(Update)
    return "suceeded", 200

@app.route("/api/article-list", methods=["GET", "POST"])
def api_INDEX_HANDLER():
    if request.method == "GET":
        with open("wiki/article-list.json") as file:
            data = json.load(file)
        return jsonify(data)
    
    if request.method == "POST":
        data = request.get_json()

        now = datetime.now()
        Entry = {
            "title": data.get("Title"),
            "url": "null",
            "file": "null",
            "updated": api.get_time(),
            "created": {
                "year": now.year,
                'month': now.strftime('%B'),
                "day": now.day,
                "hour": now.hour,
                "minute": now.minute
            }
        }
        Article = {
            "title": data.get("Title"),
            "paragraphs": [""]
        }
        api.create_article(Entry, Article)
        return "recieved", 200






app.run(host="0.0.0.0", debug=True)