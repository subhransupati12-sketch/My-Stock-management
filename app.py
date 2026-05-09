from flask import Flask, render_template, request, redirect, session
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.secret_key = "expense_secret"

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="expense_tracker"
)

cursor = db.cursor(dictionary=True)

# Home
@app.route('/')
def home():
    return render_template("login.html")

# Register
@app.route('/register', methods=['GET','POST'])
def register():

    if request.method == 'POST':

        name = request.form['name']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])

        cursor.execute(
            "INSERT INTO users(name,email,password) VALUES(%s,%s,%s)",
            (name,email,password)
        )

        db.commit()

        return redirect('/')

    return render_template("register.html")

# Login
@app.route('/login', methods=['POST'])
def login():

    email = request.form['email']
    password = request.form['password']

    cursor.execute("SELECT * FROM users WHERE email=%s",(email,))
    user = cursor.fetchone()

    if user and check_password_hash(user['password'],password):
        session['user_id'] = user['id']
        return redirect('/dashboard')

    return "Invalid Login"

# Dashboard
@app.route('/dashboard')
def dashboard():

    cursor.execute(
        "SELECT * FROM expenses WHERE user_id=%s",
        (session['user_id'],)
    )

    expenses = cursor.fetchall()

    cursor.execute("SELECT * FROM videos")

    videos = cursor.fetchall()

    return render_template(
        "dashboard.html",
        expenses=expenses,
        videos=videos
    )
# Add Expense
@app.route('/add', methods=['GET','POST'])
def add_expense():

    if request.method == 'POST':

        category = request.form['category']
        amount = request.form['amount']
        description = request.form['description']

        now = datetime.now()

        cursor.execute("""
        INSERT INTO expenses(user_id,category,amount,description,date,time)
        VALUES(%s,%s,%s,%s,%s,%s)
        """,(session['user_id'],category,amount,description,now.date(),now.time()))

        db.commit()

        return redirect('/dashboard')

    return render_template("add_expense.html")

    return render_template("add_expense.html")
# Reports
@app.route('/reports')
def reports():

    cursor.execute("""
    SELECT category, SUM(amount) as total
    FROM expenses
    WHERE user_id=%s
    GROUP BY category
    """,(session['user_id'],))

    report = cursor.fetchall()

    return render_template("reports.html",report=report)

# Delete expense
@app.route('/delete/<int:id>')
def delete(id):

    cursor.execute("DELETE FROM expenses WHERE id=%s",(id,))
    db.commit()

    return redirect('/dashboard')
@app.route('/analytics')
def analytics():
    return render_template("analytics.html")
# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)