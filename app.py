from flask import Flask, render_template, request, session, url_for, redirect
from flask_socketio import SocketIO, send, emit, join_room, rooms
from coolname import generate_slug
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from waitress import serve

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
bootstrap = Bootstrap(app)
socketio = SocketIO(app)
moment = Moment(app)


class NameForm(FlaskForm):
    name = StringField('What is your name?', validators=[DataRequired()])
    submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def get_name():
    form = NameForm()
    if form.validate_on_submit():
        session['name'] = form.name.data
        return redirect(url_for('index'))

    return render_template('username.html', form=form, name=session.get('name'))


@app.route('/index')
def index():
    name = session.get('name')
    return render_template('menu.html', name=name)


@app.route('/seek/<room_id>')
def seek(room_id):
    name = session.get('name')
    return render_template("red.html", name=name)


@app.route('/hide/<room_id>')
def hide(room_id):
    name = session.get('name')
    return render_template("yellow.html", name=name)


@socketio.on('message', namespace="/hide")
def join_room_flask_hide(msg):
    join_room(msg)
    send("yellow player has joined the game.", room=msg, namespace="/seek")


@socketio.on('message', namespace="/seek")
def join_room_flask_seek(msg):
    join_room(msg)
    send("red player has joined the game.", room=msg, namespace="/hide")


@socketio.on('ss', namespace="/seek")
def ss(msg):

    emit("rh", msg[0], namespace="/hide", room=msg[1])


@socketio.on('sttsr', namespace="/seek")
def sttsr(msg):

    emit("sttcb", msg[0], namespace="/hide", room=msg[1])


@socketio.on('sttsb', namespace="/hide")
def sttsb(msg):

    emit("sttcr", msg[0], namespace="/seek", room=msg[1])


@socketio.on('sh', namespace="/hide")
def from_yellow_client(msg):
    emit("rs", msg[0], namespace="/seek", room=msg[1])


#Generate slugs for game


@app.route('/slug', methods=["GET"])
def slug():
    if request.method == "GET":

        return {"game_id": generate_slug(2)}


if __name__ == '__main__':
    socketio.run(app, debug=True, testing=True)
    serve(app)
