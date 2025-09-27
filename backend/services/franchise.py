from db.connection import create_connection


class Franchise:
    def get_or_create(self, name):
        if not name:
            return None

        conn = create_connection()
        cursor = conn.cursor(buffered=True)  # add buffered=True

        try:
            cursor.execute("SELECT id FROM franchise WHERE name=%s", (name,))
            row = cursor.fetchone()
            if row:
                return row[0]

            cursor.execute("INSERT INTO franchise (name) VALUES (%s)", (name,))
            conn.commit()
            return cursor.lastrowid

        finally:
            cursor.close()
            conn.close()
