from db.connection import create_connection

class Category:
    VALID_KINDS = ("complaint", "compliment")

    def get_or_create(self, kind):
        if kind not in self.VALID_KINDS:
            return None

        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM category WHERE kind=%s", (kind,))
        row = cursor.fetchone()
        if row: 
            cursor.close()
            conn.close()
            return row[0]

        cursor.execute("INSERT INTO category (kind) VALUES (%s)", (kind,))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return last_id
