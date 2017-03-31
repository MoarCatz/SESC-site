from flask import Flask, render_template

app = Flask(__name__)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

app.config['DEBUG'] = True
app.config['DEBUG_TEMPLATE'] = True

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/apply/')
def apply():
    pass
