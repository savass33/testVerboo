from db.connection import create_connection

class Customer:
    def __init__(self, conn=None):
        self.conn = conn or create_connection()

    def get_or_create(self, name):
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM customers WHERE name = %s", (name,))
        row = cursor.fetchone()

        if row:
            return row[0]
        
        cursor.execute("INSERT INTO customers (name) VALUES (%s)", (name,))
        conn.commit()
        return cursor.lastrowid
