from db.connection import create_connection


class Franchise:
    def __init__(self, conn=None):
        self.conn = conn or create_connection()

    def get_or_create(self, name):
        if not name:
            return None
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM franchise WHERE %s", (name,))
        row = cursor.fetchone()
        if row:
            return row[0]
        cursor.execute("INSERT INTO franchise (name) VALUES (%s)", (name,))
        conn.commit()
        return cursor.lastrowid
