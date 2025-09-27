import mysql.connector
from mysql.connector import Error


def create_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost", user="root", password="YOUR_PASSWORD_HERE", database="verboodb"
        )
        if conn.is_connected():
            print("Sucess to connect db")
            return conn
    except Error as e:
        print(f"Error to connect to db: {e}")
        return None
