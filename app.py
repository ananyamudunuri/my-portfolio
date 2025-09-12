from flask import Flask, render_template, request, redirect, url_for, flash
import os
import csv

app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = os.environ.get("SECRET_KEY", "dev-key")

# ----- routes -----
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contact", methods=["GET"])
def contact():
    return render_template("contact.html")

@app.route("/request-resume", methods=["POST"])
def request_resume():
    name = request.form.get("name","").strip()
    email = request.form.get("email","").strip()
    note = request.form.get("note","").strip()
    os.makedirs("data", exist_ok=True)
    with open("data/resume_requests.csv","a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([name, email, note])
    flash("Thanks! I’ll email you my resume soon.")
    return redirect(url_for("contact"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
