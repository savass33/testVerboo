from db.connection import create_connection


class Stats:
    def get_stats(self):
        conn = create_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT
                COUNT(*) AS total,
                COUNT(CASE WHEN cat.kind='compliment' THEN 1 END) AS compliment,
                COUNT(CASE WHEN cat.kind='complaint' THEN 1 END) AS complaint
            FROM feedbacks f
            LEFT JOIN category cat ON f.category_id = cat.id
            """
        )
        stats = cursor.fetchone()
        cursor.close()
        conn.close()

        for key in ["total", "compliment", "complaint"]:
            stats[key] = stats[key] or 0

        return stats
