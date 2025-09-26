from db.connection import create_connection

class Franchise:
    def get_or_create(self, name):
        if not name: return None

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM franchise WHERE name=%s", (name,))
        row = cursor.fetchone()
        if row:
            cursor.close()
            conn.close()
            return row[0]

        cursor.execute("INSERT INTO franchise (name) VALUES (%s)", (name,))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return last_id
