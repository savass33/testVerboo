from db.connection import create_connection


class Category:
    VALID_KINDS = ("complaint", "compliment")

    def __init__(self, conn):
        self.conn = conn  # Conexão compartilhada

    def get_or_create(self, kind):
        if kind not in self.VALID_KINDS:
            return None

        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT id FROM category WHERE kind=%s", (kind,))
            row = cursor.fetchone()
            if row:
                return row[0]

            cursor.execute("INSERT INTO category (kind) VALUES (%s)", (kind,))
            self.conn.commit()
            return cursor.lastrowid
        finally:
            cursor.close()
