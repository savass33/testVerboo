import os
import mysql.connector
from mysql.connector import Error


def create_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST", "db"),
            user="root",
            password=os.getenv("MYSQL_ROOT_PASSWORD"),
            database=os.getenv("DB_NAME"),
        )
        if conn.is_connected():
            print("Sucess to connect db")
            return conn
    except Error as e:
        print(f"Error to connect to db: {e}")
        return None
