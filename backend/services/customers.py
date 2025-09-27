from db.connection import create_connection

class Customer:
    def get_or_create(self, name):
        if not name: return None

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM customers WHERE name=%s", (name,))
        row = cursor.fetchone()
        if row:
            cursor.close()
            conn.close()
            return row[0]

        cursor.execute("INSERT INTO customers (name) VALUES (%s)", (name,))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return last_id
