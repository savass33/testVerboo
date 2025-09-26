from db.connection import create_connection


class Stats:
    def __init__(self, conn):
        self.conn = conn

    def get_stats(self):
        cursor = self.conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT
                COUNT(*) AS total,
                SUM(cat.kind='compliment') AS compliment,
                SUM(cat.kind='complaint') AS complaint
            FROM feedbacks f
            LEFT JOIN category cat ON f.category_id = cat.id
            """
        )
        stats = cursor.fetchone()
        cursor.close()

        # garantir que nulos sejam 0
        for key in ['total', 'compliment', 'complaint']:
            stats[key] = stats[key] or 0

        return stats
