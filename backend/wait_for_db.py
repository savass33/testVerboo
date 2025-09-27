import os
import time
import mysql.connector
from mysql.connector import Error

DB_HOST = os.getenv("DB_HOST", "db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "#Sasa2005gamer")
DB_NAME = os.getenv("DB_NAME", "verboodb")

while True:
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        if conn.is_connected():
            print("Banco de dados disponível!")
            conn.close()
            break
    except Error:
        print("Aguardando o banco de dados...")
        time.sleep(2)
