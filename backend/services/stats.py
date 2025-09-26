from db.connection import create_connection


class Stats:
    def __init__(self):
        self.conn = create_connection()

    def get_stats(self):
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT
                COUNT(*) AS total,
                SUM(cat.type='compliment') AS compliment,
                SUM(cat.type='complaint') AS complaint
            FROM feedbacks f
            LEFT JOIN category cat ON f.category_id = cat.id
        """
        )
        stats = cursor.fetchone()
        cursor.close()

        # Garantir que valores nulos sejam convertidos para 0
        stats["total"] = stats["total"] or 0
        stats["compliment"] = stats["compliment"] or 0
        stats["complaint"] = stats["complaint"] or 0

        return stats
