from db.connection import create_connection

class Feedbacks:
    def insert(self, customer_id, franchise_id, category_id, message_text, notes=None):
        conn = create_connection()
        cursor = conn.cursor()
        sql = """
        INSERT INTO feedbacks (customer_id, franchise_id, category_id, message_text, notes)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (customer_id, franchise_id, category_id, message_text, notes))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return last_id

    def update(self, feedback_id, customer_id=None, franchise_id=None, category_id=None, notes=None):
        conn = create_connection()
        cursor = conn.cursor()
        fields, params = [], []

        if customer_id: fields.append("customer_id=%s"); params.append(customer_id)
        if franchise_id: fields.append("franchise_id=%s"); params.append(franchise_id)
        if category_id: fields.append("category_id=%s"); params.append(category_id)
        if notes: fields.append("notes=%s"); params.append(notes)

        if not fields: return False

        sql = f"UPDATE feedbacks SET {', '.join(fields)} WHERE id=%s"
        params.append(feedback_id)
        cursor.execute(sql, tuple(params))
        conn.commit()
        cursor.close()
        conn.close()
        return True

    def get_last_feedback_by_customer(self, customer_id):
        conn = create_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM feedbacks WHERE customer_id=%s ORDER BY timestamp DESC LIMIT 1",
            (customer_id,)
        )
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return result

    def get_feedbacks(self, franchise_id=None, category_id=None):
        conn = create_connection()
        cursor = conn.cursor(dictionary=True)
        sql = """
        SELECT
            f.id,
            c.name AS customer_name,
            fr.name AS franchise_unit,
            cat.kind AS category,
            f.message_text,
            f.notes,
            f.timestamp
        FROM feedbacks f
        LEFT JOIN customers c ON f.customer_id=c.id
        LEFT JOIN franchise fr ON f.franchise_id=fr.id
        LEFT JOIN category cat ON f.category_id=cat.id
        WHERE 1=1
        """
        params = []
        if franchise_id: sql += " AND fr.id=%s"; params.append(franchise_id)
        if category_id: sql += " AND cat.id=%s"; params.append(category_id)

        cursor.execute(sql, tuple(params))
        results = cursor.fetchall()
        cursor.close()
        conn.close()

        for row in results:
            if row["notes"]:
                row["notes"] = row["notes"].split("\n")[0]
        return results
