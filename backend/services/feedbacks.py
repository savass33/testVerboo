from db.connection import create_connection


class Feedbacks:
    def __init__(self, conn=None):

        self.conn = conn or create_connection()

    def insert(self, customer_id, franchise_id, category_id, message_text, notes=None):

        cursor = self.conn.cursor()
        sql = """
        INSERT INTO feedbacks (customer_id, franchise_id, category_id, message_text, notes)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(
            sql, (customer_id, franchise_id, category_id, message_text, notes)
        )
        self.conn.commit()
        inserted_id = cursor.lastrowid
        cursor.close()
        return inserted_id

    def get_feedbacks(self, franchise_id=None, category_id=None):
        cursor = self.conn.cursor(dictionary=True)
        sql = """
        SELECT 
            f.id,
            c.name AS customer_name,
            fr.name AS franchise_unit,
            cat.type AS category,
            f.message_text,
            f.notes,
            f.timestamp
        FROM feedbacks f
        LEFT JOIN customers c ON f.customer_id = c.id
        LEFT JOIN franchise fr ON f.franchise_id = fr.id
        LEFT JOIN category cat ON f.category_id = cat.id
        WHERE 1=1
        """
        params = []

        if franchise_id:
            sql += " AND fr.id = %s"
            params.append(franchise_id)
        if category_id:
            sql += " AND cat.id = %s"
            params.append(category_id)

        cursor.execute(sql, tuple(params))
        results = cursor.fetchall()
        cursor.close()

        # Simplificar o notes, mantendo apenas informação objetiva
        for row in results:
            if row["notes"]:
                # exemplo: "O cliente reclamou da marmita na unidade Alameda, não forneceu informações detalhadas."
                row["notes"] = row["notes"].split("\n")[
                    0
                ]  # pega apenas a primeira linha
        return results
