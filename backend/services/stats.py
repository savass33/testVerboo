from db.connection import create_connection

def get_stats():
    conn = create_connection()

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) as total, SUM(category='Elogio') as Elogios, SUM(category='Reclamação') as Reclamações FROM feedbacks")
    stats = cursor.fetchone()
    cursor.close()
    conn.close()
    return stats