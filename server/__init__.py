from flask import Flask, render_template, request, jsonify, render_template_string
from flask import send_from_directory, session, url_for, redirect, send_from_directory
from flask_session import Session
from datetime import timedelta
from objects import User, Product
from xml.dom.pulldom import START_DOCUMENT, START_ELEMENT, parseString, parse
from contextlib import closing
import xml.dom.pulldom
import hashlib
import urllib
import json
import os
import sys
import psycopg2
import pickle

CONNECTION_DATA = "dbname=postgres user=postgres password=postgres"
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

SESSION_TYPE = 'filesystem'
SECRET_KEY = b'secret-key'
SESSION_FILE_DIR = '/var/www/startapp.com/flask_session/'
PERMANENT_SESSION_LIFETIME = timedelta(minutes=20)
UPLOAD_FOLDER = '/var/www/startapp.com/uploads'

app.config.from_object(__name__)

sess = Session()
sess.init_app(app)

###############################################################################
# PATHS 
###############################################################################

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if not session.get('logged_in', False) and not path == 'registerPage':
        return redirect(url_for('loginPage'))
    return render_template('index.html')

@app.route("/registerPage")
@app.route("/loginPage")
def loginPage():
    if not session.get('logged_in', False):
        return render_template('index.html')
    return redirect('/')

@app.route("/settings")
def settings():
    user = request.args.get('user')
    user = pickle.loads(urllib.unquote(user))

    return render_template("html/settings.html", user=user.username, role=user.role)

# SSTI - Server Site Template Injection
@app.route("/test")
def test():
    exploit = request.args.get('exploit')
    rendered_template = render_template("html/test.html", exploit=exploit)

    return render_template_string(rendered_template)

# Python Code Execution
@app.route("/test2")
def test2():
    param = request.args.get('exploit')
    x = eval(param)

    return render_template_string("<p>Hello {param}</p>".format(param=x))

# Local File Inclusion
@app.route("/test3")
def test3():
    param = request.args.get('exploit')
    param = param.replace("../", "")
    param = "/home/embchnk/startApp/static/html/" + param

    return open(param).read()

# Local File Inclusion / External Link Inclusion(?)
@app.route("/test4")
def test4():
    url = "/static/html/test4.php?{PARAMS}"\
            .format(PARAMS=urllib.urlencode(request.args))

    return redirect(url)

###############################################################################
# REST API
###############################################################################

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return ('', 200)

@app.route("/login", methods=['POST', 'GET'])
def login():
    data = request.data
    data = json.loads(data)
    with psycopg2.connect(CONNECTION_DATA) as conn:
        with closing(conn.cursor()) as cur:
            cur.execute("SELECT login, password FROM site_user WHERE login = '{}'"
                .format(data['userName']))
            result = cur.fetchall()
    if not result:
        return json.dumps({"status": "Wrong username"})
    username = result[0][0]
    password = result[0][1]
    input_pass = hashlib.md5(data['password']).hexdigest()
    if password == input_pass:
        session['logged_in'] = True
        session['username'] = username
        session['role'] = "standard-user"
        return json.dumps({"status": "success"})
    else:
        return json.dumps({"status": "Wrong password"})

@app.route("/addComment", methods=['POST'])
def add_comment():
    data = request.data
    data = json.loads(data)
    return json.dumps(data)

@app.route("/getUser", methods=['GET'])
def get_user_data():
    username = session['username']
    role = session['role']
    user = User(username, role)
    return json.dumps({'userdata': urllib.quote(pickle.dumps(user))})

@app.route("/addProduct", methods=['POST'])
def add_product():
    if not request.files:
        xml = request.data
    else:
        file = request.files['file']
        xml = file.read()
    data = parseString(xml)
    prod_details = dict()
    for event, node in data:
        if event == START_ELEMENT and node.tagName == 'product':
            data.expandNode(node)
            for details in node.childNodes:
                if not getattr(details, 'tagName', None):
                    continue
                prod_details[details.tagName] =\
                "".join(detail.nodeValue for detail in details.childNodes)
    product = Product(
        name=prod_details['name'],
        owner=prod_details['owner'],
        price=prod_details['price']
    )
    return "{NAME};{OWNER};{PRICE}".format(
        NAME=product.name, OWNER=product.owner, PRICE=product.price
    )

@app.route("/register", methods=['POST'])
def register():
    data = request.data
    data = json.loads(data)
    password = hashlib.md5(data['password']).hexdigest()
    with psycopg2.connect(CONNECTION_DATA) as conn:
        with closing(conn.cursor()) as cur:
            cur.execute(
                "INSERT INTO site_user (login, password) VALUES ('{USERNAME}', '{PASSWORD}') RETURNING login"
                .format(USERNAME=data['userName'], PASSWORD=password)
            )
            conn.commit()
            result = cur.fetchall()

    return "{result}".format(result=result)

@app.route("/changePassword", methods=['POST'])
def change_password():
    data = request.data
    data = json.loads(data)
    user = User(session['username'], session['role'])
    old_password = data['oldPassword']
    new_password = data['newPassword']

    with psycopg2.connect(CONNECTION_DATA) as conn:
        with closing(conn.cursor()) as cur:
            cur.execute("SELECT login, password FROM site_user WHERE login = '{}'"
                .format(user.username))
        result = cur.fetchall()
    if not result:
        return json.dumps({'result': 'failed'})
    username = result[0][0]
    password = result[0][1]

    input_pass = hashlib.md5(old_password).hexdigest()
    if input_pass != password:
        return json.dumps({"result": "failed"})
    return json.dumps({"result": "success"})

@app.route("/findProduct")
def find_product():
    data = request.args.get('id')
    with psycopg2.connect(CONNECTION_DATA) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM product WHERE id = {}".format(data))
            results = cur.fetchall()

    return ", ".join(str(result) for result in results)


if __name__ == "__main__":
    app.debug = True
    app.run()
