from db.connection import create_connection


def get_feedbacks(category=None, franchise_unit=None):
    conn = create_connection()
    cursor = conn.cursor(dictionary=True)

    sql = "SELECT * from feedbacks"

    params = []
    if category:
        sql += "AND category=%s"
        params.append(category)
    if franchise_unit:
        sql += "AND franchise_unit=%s"
        params.append(franchise_unit)

    cursor.execute(sql, tuple(params))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results
