from db.connection import create_connection


class Category:
    def __init__(self, conn=None):
        self.conn = conn or create_connection()

    def get_or_create(self, category_type):
        """
        Recebe diretamente 'complaint' ou 'compliment' e retorna o ID correspondente.
        """
        cursor = self.conn.cursor()
        cursor.execute("SELECT id FROM category WHERE type=%s", (category_type,))
        row = cursor.fetchone()
        if row:
            cursor.close()
            return row[0]

        cursor.execute(
            "INSERT INTO category (type) VALUES (%s)",
            (category_type,),
        )
        self.conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        return last_id
