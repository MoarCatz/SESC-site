from flask import Flask, render_template

app = Flask(__name__)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

app.config['DEBUG'] = True
app.config['DEBUG_TEMPLATE'] = True

@app.route('/')
def index():
    return render_template('index.j2')

@app.route('/about/')
def about():
    return render_template('about.j2')

@app.route('/study/')
def study():
    return render_template('study.j2')

@app.route('/departments/')
def departments():
    return render_template('departments.j2')

@app.route('/commercial/')
def commercial():
    return render_template('commercial.j2')

@app.route('/contests/')
def contests():
    return render_template('contests.j2')

@app.route('/apply/')
def apply():
    return render_template('apply.j2')

@app.route('/contact/')
def contact():
    return render_template('contact.j2')

@app.route('/journal/')
def journal():
    return render_template('journal.j2')

@app.route('/journal_teacher/')
def journal_teacher():
    return render_template('journal_teacher.j2')

if __name__ == '__main__':
    app.run(port=80)
